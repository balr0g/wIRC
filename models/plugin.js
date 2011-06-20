function wircPluginModel(){

	this.LIBIRC_ERR_OK			=	0;
	this.LIBIRC_ERR_INVAL		=	1;
	this.LIBIRC_ERR_RESOLV		=	2;
	this.LIBIRC_ERR_SOCKET		=	3;
	this.LIBIRC_ERR_CONNECT		=	4;
	this.LIBIRC_ERR_CLOSED		=	5;
	this.LIBIRC_ERR_NOMEM		=	6;
	this.LIBIRC_ERR_ACCEPT		=	7;
	this.LIBIRC_ERR_NODCCSEND	=	9;
	this.LIBIRC_ERR_READ		=	10;
	this.LIBIRC_ERR_WRITE		=	11;
	this.LIBIRC_ERR_STATE		=	12;
	this.LIBIRC_ERR_TIMEOUT		=	13;
	this.LIBIRC_ERR_OPENFILE	=	14;
	this.LIBIRC_ERR_TERMINATED	=	15;
	this.LIBIRC_ERR_NOIPV6		=	16;
	this.LIBIRC_ERR_MAX			=	17;

    this.isReady = false;
}

// abstracted this so we can change all the parsing at one point
wircPluginModel.jsonParse = function(string)
{
	try
	{
		// attempt parser
		return JSON.parse(string);
	}
	catch (e)
	{
		//Mojo.Log.logException(e, 'wircPlugin#jsonParse');
		//Mojo.Log.error('string:', string);
		
		// fall back to eval parser
		return eval(string);
	}
	// wtf?
	return false;
}

wircPluginModel.prototype.getErrorMsg = function(error)
{
	var errMsg = 'Unknown error code';

	switch (error) {
		case this.LIBIRC_ERR_OK:
			errMsg = 'No error'; break;
		case this.LIBIRC_ERR_INVAL:
			errMsg = 'Invalid argument'; break;
		case this.LIBIRC_ERR_RESOLV:
			errMsg = 'Could not resolve host'; break;
		case this.LIBIRC_ERR_SOCKET:
			errMsg = 'Could not create socket'; break;
		case this.LIBIRC_ERR_CONNECT:
			errMsg = 'Could not connect'; break;
		case this.LIBIRC_ERR_CLOSED:
			errMsg = 'Connection closed by remote peer'; break;
		case this.LIBIRC_ERR_NOMEM:
			errMsg = 'Out of memory'; break;
		case this.LIBIRC_ERR_ACCEPT:
			errMsg = 'Could not accept new connection'; break;
		case this.LIBIRC_ERR_NODCCSEND:
			errMsg = 'Could not send this'; break;
		case this.LIBIRC_ERR_READ:
			errMsg = 'Could not read DCC file or socket'; break;
		case this.LIBIRC_ERR_WRITE:
			errMsg = 'Could not write DCC file or socket'; break;
		case this.LIBIRC_ERR_STATE:
			errMsg = 'Invalid state'; break;
		case this.LIBIRC_ERR_TIMEOUT:
			errMsg = 'Operation timed out'; break;
		case this.LIBIRC_ERR_OPENFILE:
			errMsg = 'Could not open file for DCC send'; break;
		case this.LIBIRC_ERR_TERMINATED:
			errMsg = 'IRC server connection terminated'; break;
		case this.LIBIRC_ERR_NOIPV6:
			errMsg = 'IPv6 not supported'; break;
		case this.LIBIRC_ERR_MAX:
			errMsg = 'Internal max error value count'; break;
	}

	return errMsg;

}

wircPluginModel.prototype.registerHandlers = function() {
	
    plugin.event_connect = this.event_connect_handler.bind(this);
    plugin.event_nick = this.event_nick_handler.bind(this);
    plugin.event_quit = this.event_quit_handler.bind(this);
    plugin.event_join = this.event_join_handler.bind(this);
    plugin.event_part = this.event_part_handler.bind(this);
    plugin.event_mode = this.event_mode_handler.bind(this);
    plugin.event_umode = this.event_umode_handler.bind(this);
    plugin.event_topic = this.event_topic_handler.bind(this);
    plugin.event_kick = this.event_kick_handler.bind(this);
    plugin.event_channel = this.event_channel_handler.bind(this);
    plugin.event_privmsg = this.event_privmsg_handler.bind(this);
    plugin.event_notice = this.event_notice_handler.bind(this);
    plugin.event_channel_notice = this.event_channel_notice_handler.bind(this);
    plugin.event_invite = this.event_invite_handler.bind(this);
    plugin.event_ctcp_req = this.event_ctcp_req_handler.bind(this);
    plugin.event_ctcp_rep = this.event_ctcp_rep_handler.bind(this);
    plugin.event_ctcp_action = this.event_ctcp_action_handler.bind(this);
    plugin.event_unknown = this.event_unknown_handler.bind(this);
    plugin.event_numeric = this.event_numeric_handler.bind(this);
    plugin.event_rtt = this.event_rtt_handler.bind(this);
	plugin.event_dcc_send_req = this.event_dcc_send_req_handler.bind(this);
	plugin.event_dcc_chat_req = this.event_dcc_chat_req_handler.bind(this);
	plugin.handle_dcc_callback = this.dcc_callback_handler.bind(this);
	plugin.handle_dcc_send_callback = this.dcc_send_callback_handler.bind(this);
	
	// register handlers is the last thing to the plugin being "ready"
	// here we should also init any autoconnect servers!
	servers.initAutoConnectServers();
	
}

wircPluginModel.prototype.dcc_callback_handler = function(id, dcc_id, status, length, data){
	
	var tmpDcc = servers.servers[id].getDcc(dcc_id)
	if (tmpDcc)
		tmpDcc.handleEvent(status, length, data);
	else
		Mojo.Log.error('****** NO SUCH DCC');
}

wircPluginModel.prototype.dcc_send_callback_handler = function(id, dcc_id, status, bitsIn, percent){
	
	var tmpDcc = servers.servers[id].getDcc(dcc_id)
	if (tmpDcc)
		tmpDcc.handleSendEvent(status, bitsIn, percent);
	else
		Mojo.Log.error('****** NO SUCH DCC');
}

wircPluginModel.prototype.event_dcc_send_req_handler = function(id, nick, address, filename, size, dcc_id) {
	var params = {
		server: servers.servers[id],
		nick: servers.servers[id].getNick(nick),
		address: address,
		filename: filename,
		size: size,
		dcc_id: dcc_id
	};
	servers.servers[id].startDcc(params);
}

wircPluginModel.prototype.event_dcc_chat_req_handler = function(id, nick, address, dcc_id) {
	var params = {
		server: servers.servers[id],
		nick: servers.servers[id].getNick(nick),
		address: address,
		filename: false,
		size: false,
		dcc_id: dcc_id
	};;
	servers.servers[id].startDcc(params);
}

wircPluginModel.prototype.event_connect_handler = function(id, event, origin, params_s, ip)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	if (event=='MAXRETRIES')
	{
		servers.servers[id].setState(servers.servers[id].STATE_MAX_RETRIES);
		return;	
	}

	servers.servers[id].realServer = origin;
	
	servers.servers[id].nick = servers.servers[id].getNick(params[0]); 
	servers.servers[id].nick.me = true;
	
	servers.servers[id].sessionIpAddress = ip;
	if (connectionInfo.wan.state=='connected' && connectionInfo.wan.ipAddress==servers.servers[id].sessionIpAddress)
	{
		servers.servers[id].sessionInterface = "wan";
		servers.servers[id].sessionNetwork = connectionInfo.wan.network;
	}
	else
	{
		servers.servers[id].sessionInterface = "wifi";
		servers.servers[id].sessionNetwork = '';
	}
	
	servers.servers[id].setState(servers.servers[id].STATE_CONNECTED);

	servers.servers[id].runOnConnect.bind(servers.servers[id]).defer();
}

wircPluginModel.prototype.event_part_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);	
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpChan = servers.servers[id].getChannel(params[0]);
	if (tmpChan) 
	{
		var tmpNick = servers.servers[id].getNick(origin);
		tmpNick.removeChannel(tmpChan);
		if (tmpNick.me)
			servers.servers[id].removeChannel(tmpChan);
		if (prefs.get().eventPart)
			tmpChan.newMessage('type5', false, tmpNick.name + ' (' + origin.split("!")[1] + ') has left ' + tmpChan.name + ' (' + params[1] + ')');
	}	
}

wircPluginModel.prototype.event_invite_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	if (prefs.get().inviteAction != 'ignore') 
	{
		var tmpNick = servers.servers[id].getNick(origin);
		if (tmpNick && params[0].toLowerCase() === servers.servers[id].nick.name.toLowerCase())
		{
			tmpChan = servers.servers[id].getChannel(params[1]);
			if (!tmpChan || !tmpChan.containsNick(servers.servers[id].nick)) 
				servers.servers[id].openInvite(tmpNick.name, params[1]);
		}
	}
}

wircPluginModel.prototype.event_channel_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpChan = servers.servers[id].getChannel(params[0]);
	if (tmpChan) 
	{
		var tmpNick = servers.servers[id].getNick(origin);
		tmpNick.addChannel(tmpChan);
		tmpChan.newMessage('privmsg', tmpNick, params[1]);
	}
}

wircPluginModel.prototype.event_privmsg_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpNick = servers.servers[id].getNick(origin);
	var tmpQuery = servers.servers[id].getQuery(tmpNick);
	if (tmpQuery)
		tmpQuery.newMessage('privmsg', tmpNick, params[1]);
	else
		servers.servers[id].startQuery(tmpNick, false, 'message', params[1]);
}

wircPluginModel.prototype.event_nick_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpNick = servers.servers[id].getNick(origin);
	if (tmpNick === servers.servers[id].nick)
		servers.servers[id].newMessage('type9', false, tmpNick.name + ' is now known as ' + params[0]);
	tmpNick.updateNickName(params[0]);
}

wircPluginModel.prototype.event_mode_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	//servers.servers[id].debugPayload(event, origin, params_s, true);
	
	var tmpNick = servers.servers[id].getNick(origin);
	var tmpChan = servers.servers[id].getChannel(params[0]);
	if (tmpChan) 
	{
		if (params[2])
		{
			var modeNick = servers.servers[id].getNick(params[2]);
			if (modeNick)
				modeNick.updateMode(params[1], tmpChan);
			if (prefs.get().eventMode)
				tmpChan.newMessage('type3', false, 'Mode ' + modeNick.name + ' ' + params[1] + ' by ' + tmpNick.name);
		}
		else
		{
			if (prefs.get().eventMode)
				tmpChan.newMessage('type3', false, 'Mode ' + params[0] + ' ' + params[1] + ' by ' + tmpNick.name);
		}
	}
}

wircPluginModel.prototype.event_umode_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	//servers.servers[id].debugPayload(event, origin, params_s, true);
	
	var tmpNick = servers.servers[id].getNick(origin);
	if (tmpNick) {
		tmpNick.mode = params[0];
		servers.servers[id].newMessage('type3', false, 'Mode ' + origin + ' ' + params[0] + ' by ' + origin);
	}
}
	
wircPluginModel.prototype.event_join_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpChan = servers.servers[id].getOrCreateChannel(params[0], null);
	if (tmpChan) 
	{
		var tmpNick = servers.servers[id].getNick(origin);
		if (tmpNick.me)
		{
			if (servers.servers[id].autoOpenFavs) {
			    var favoriteChannels = servers.servers[id].favoriteChannels;
			    if (favoriteChannels && (favoriteChannels.length > 0)) {
				for (var c = 0; c < favoriteChannels.length; c++) {
				    if (tmpChan.name == favoriteChannels[c]) {
					tmpChan.openStage();
				    }
				}
			    }
			}
			else {
			    tmpChan.openStage();
			}
			tmpChan.joined = true;
		}
		tmpNick.addChannel(tmpChan, '');
		if (prefs.get().eventJoin)
			tmpChan.newMessage('type4', false, tmpNick.name + ' (' + origin.split("!")[1] + ') has joined ' + tmpChan.name);
	}
}

wircPluginModel.prototype.event_quit_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpNick = servers.servers[id].getNick(origin);
	if (tmpNick)
	{
		for (var i = 0; i< tmpNick.channels.length; i++)
			if (prefs.get().eventQuit)
				tmpNick.channels[i].newMessage('type5', false, tmpNick.name + ' has quit (' + params + ')');
		servers.servers[id].removeNick(tmpNick);
	}	
}

wircPluginModel.prototype.event_topic_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpChan = servers.servers[id].getChannel(params[0]);
	if (tmpChan)
	{
		var tmpNick = servers.servers[id].getNick(origin);
		tmpChan.topicUpdate(params[1]);
		tmpChan.newMessage('type8', false, tmpNick.name + ' changed the topic to: ' + params[1]);
	}
}

/*
 * These are notices that are directed towards the active/signed-on nick.
 * These should probably spawn a query window, but that might get really
 * annoying for commom notices such as those from Nickserv/Chanserv, etc.
 * For now all of these notices will get directed to the server status
 * window until a better solution is implemented.
 */	
wircPluginModel.prototype.event_notice_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpNick = servers.servers[id].getNick(origin);
	servers.servers[id].getVisibleScene().newMessage('type6', tmpNick, params[1]);
}

/*
 * These are notices that are directed towards a specific channel.
 */
wircPluginModel.prototype.event_channel_notice_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpNick = servers.servers[id].getNick(origin);
	var tmpChan = servers.servers[id].getChannel(params[0]);
	if (tmpChan) tmpChan.newMessage('type6', tmpNick, params[1]);
	else servers.servers[id].newMessage('type6', tmpNick, params[1]);
}

wircPluginModel.prototype.ctcp_rep = function(id, nick, reply)
{
	//Mojo.Log.error('CTCP_REP:', id, nick, reply);
	plugin.ctcp_rep(id, nick, reply);
}

wircPluginModel.prototype.event_ctcp_req_handler = function(id, event, origin, params_s) {
	
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	var tmpMatch = twoValRegExp.exec(params[0]);
	servers.servers[id].newMessage('type3.5', false, 'Received ' + event + ' ' + tmpMatch[1] + ' request by '+ ' ' + origin, false);
	
	var nick = servers.servers[id].getNick(origin);
	var reply = false;
	var tmpReply = false;
	
	var cmd = tmpMatch[1].toUpperCase();
		
	switch (cmd) {
	case 'PING':		// Used to measure the delay of the IRC network between clients.
		reply = params[0];
		break;	
	case 'FINGER':		// Returns the user's full name, and idle time.
		tmpReply = replaceTokens(prefs.get().ctcpReplyFinger);
		if (tmpReply.length>0) reply = 'FINGER ' + tmpReply;
		break;
	case 'VERSION': 	// The version and type of the client.
		tmpReply = replaceTokens(prefs.get().ctcpReplyVersion);
		if (tmpReply.length>0) reply = 'VERSION ' + tmpReply;
		break;
	case 'SOURCE':		// Where to obtain a copy of a client.
		reply = 'SOURCE http://git.webos-internals.org/?p=applications/wIRC.git';
		break;
	case 'USERINFO':	// A string set by the user (never the client coder)
		tmpReply = replaceTokens(prefs.get().ctcpReplyUserinfo);
		if (tmpReply.length>0) reply = 'USERINFO ' + tmpReply;
		break;
	case 'CLIENTINFO':	// Dynamic master index of what a client knows.
		break;
	case 'ERRMSG':		// Used when an error needs to be replied with.
		break;
	case 'TIME':		// Gets the local date and time from other clients.
		tmpReply = replaceTokens(prefs.get().ctcpReplyTime);
		if (tmpReply.length>0) reply = 'TIME ' + tmpReply; 
		break;
	}
	
	if (reply) {
		this.ctcp_rep.defer(id, nick.name, reply);
	} else {
		servers.servers[id].debugPayload(event, origin, params_s, true);
	}
	
}
wircPluginModel.prototype.event_ctcp_rep_handler = function(id, event, origin, params_s) {
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	var tmpNick = servers.servers[id].getNick(origin);
	var tmpMatch = twoValRegExp.exec(params[0]);
	if (tmpMatch) {
		switch (tmpMatch[1]) {
		case 'PING':
			var sent = servers.servers[id].pings[tmpNick.name].getTime();
			var date = new Date();
			var resp = date.getTime();
			servers.servers[id].getVisibleScene().newMessage('type3.5', false, 'Ping reply from ' + tmpNick.name + ': ' + formatMilliSeconds(resp - sent) + (tmpMatch[2] ? '- ' + tmpMatch[2] : ''));
			break;
		default:
			servers.servers[id].newMessage('type3.5', false, 'Received ' + event + ' ' + tmpMatch[1] + ' reply from ' + tmpNick.name + ': ' + tmpMatch[2], false);
			break;
		}
	}
}

/*
 * These are actions (generated only by /me it seems). These messages should
 * show up in a channel or query message only (I think).
 */
wircPluginModel.prototype.event_ctcp_action_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpNick = servers.servers[id].getNick(origin);
	var tmpChan = servers.servers[id].getChannel(params[0]);
	if (tmpChan)
		tmpChan.newMessage('type7', tmpNick, params[1]);
	else
	{
		var tmpQuery = servers.servers[id].getQuery(tmpNick);
		if (tmpQuery)
			tmpQuery.newMessage('type7', tmpNick, params[1]);
		else
			servers.servers[id].startQuery(tmpNick, false, 'type7', params[1]);
	}					
}

wircPluginModel.prototype.event_kick_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var params = wircPluginModel.jsonParse(params_s);
	
	var tmpChan = servers.servers[id].getChannel(params[0]);
	if (tmpChan) 
	{
		var tmpNick = servers.servers[id].getNick(params[1]);
		var tmpNick2 = servers.servers[id].getNick(origin);
		var reason = params[2];
		if (tmpNick)
		{
			tmpNick.removeChannel(tmpChan); 
			if (tmpNick.me)
			{
				tmpChan.closeStage();
				servers.servers[id].removeChannel(tmpChan);
			}
			tmpChan.newMessage('type10', false, tmpNick2.name + ' has kicked ' + tmpNick.name + ' from ' + params[0] + ' (' + params[2] + ')');
		}
	}
}

/*
 * We need to figure out a more generic way to handle all these numeric events.
 * There must be some sort of rule/heuristic we can follow to format them.
 * 
 * Doesn't look like there's much of a pattern: http://www.mirc.net/raws/
 * There is also: http://www.alien.net.au/irc/irc2numerics.html
 */
wircPluginModel.prototype.event_numeric_handler = function(id, event, origin, params_s)
{
	var id = parseInt(id);
	var evt = parseInt(event);
	var params = wircPluginModel.jsonParse(params_s);
	
	var msgTarget = servers.servers[id];
	var msgType = 'type2';
	var nick = false;
	var dontUpdate = true;
	
	
    var i = 2;
    var msg = params[1];
    if (params.length > i) 
        do {
            msg += ' ' + params[i];
            i++;
        }
        while (i < params.length);
		
	switch (evt) {
		case 1:		clearTimeout(servers.servers[id].connectionTimeout);	break;
			
		case 305:	servers.servers[id].setAwayStatus(false);	break;
		case 306:	servers.servers[id].setAwayStatus(true);	break;
			
		case 312: // whois && whowas response
			msgTarget = servers.servers[id].getVisibleScene();
		case 301:
		case 311:
		case 313: 
		case 317:
		case 318:
		case 319:
		case 320:
			var tmpNick = servers.servers[id].getNick(params[1]);
			if (tmpNick)
				tmpNick.whoisEvent(event, params);
			break;
			
		case 205: // trace
		case 262: // trace end
		case 314: // whowas
		case 315: // who
		case 352: // who end
		case 369: // whowas end
		case 402: // trace error
		case 406: // whowas error
			msgTarget = servers.servers[id].getVisibleScene();
			break;
			
		case 321:
			servers.servers[id].listStart();
			msg = false;
			break;
		case 322:
			servers.servers[id].listAddChannel.bind(servers.servers[id]).defer(params[1], params[2], params[3]);
			msg = false;
			break;
		case 323:
			servers.servers[id].listEnd.bind(servers.servers[id]).defer();
			msg = false;
			break;
		
		case 324:
			var tmpChan = servers.servers[id].getChannel(params[1]);
			if (tmpChan)
				tmpChan.channelMode(params[2]);
			break;
			
		case '329':
			msgType = 'type8';
			msgTarget = servers.servers[id].getChannel(params[1]);
			var newDate = new Date();
			newDate.setTime(params[3]*1000);
			dateString = newDate.toUTCString();
			msg = 'Channel ' + params[1] + ' created on ' + dateString;
			break;
			
		case 332:
			msgType = 'type8';
			msgTarget = servers.servers[id].getChannel(params[1]);
			if (msgTarget) {
				msgTarget.topicUpdate(params[2]);
				if (msgTarget.containsNick(servers.servers[id].nick))
					msg = 'Topic for ' + params[1] + ' is "' + params[2] + '"';
			} else {
				msgTarget = servers.servers[id];
				msg = 'Topic for ' + params[1] + ' is "' + params[2] + '"';
			}
			break;
			
		case '333':
			msgType = 'type8';
			msgTarget = servers.servers[id].getChannel(params[1]);
			var newDate = new Date();
			newDate.setTime(params[3]*1000);
			dateString = newDate.toUTCString();
			msg = 'Topic set by ' + params[2] + ' on ' + dateString;
			break;
			
		case 353:
			msg = false;
			var nicks = params[3].split(" ");
			var tmpChan = servers.servers[id].getChannel(params[2]);
			var tmpNick;
			if (tmpChan) {
				for (var i = 0; i < nicks.length; i++) {
					if (nicks[i]) {
						var prefixNick = '';
						var onlyNick = nicks[i];
						if (ircNick.hasPrefix(onlyNick)) {
							prefixNick = nicks[i].substr(0, 1);
							onlyNick = nicks[i].substr(1);
						}
						tmpNick = servers.servers[id].getNick(onlyNick);
						if (tmpNick)
							tmpNick.addChannel(tmpChan, ircNick.getPrefixMode(prefixNick));
					}
				}
			}
			break;
			
		case 375:
		case 376:
			servers.servers[id].updateStatusList();
			break;
		
		case 404:
			msgTarget = servers.servers[id].getChannel(params[2]);
			if (msgTarget && msgTarget.containsNick(servers.servers[id].nick))
				msg = params[3];
			break;
		
		case 477:
		case 482:
			msgTarget = servers.servers[id].getChannel(params[1]);
			if (msgTarget && tmpChan.containsNick(servers.servers[id].nick))
				msg = params[2];
			break;
	}
	if (msg)
	{
		if (msgTarget)
		{
			if (prefs.get().showNumericEvents) msg = '['+evt+']' + msg;
			msgTarget.newMessage(msgType, nick, msg, dontUpdate);
		}
		else
		{
			Mojo.Log.error('NUMERIC EVENT:', evt, ' - ', msg);
		}
	}
	
	if (evt == 433)
	{
		//Mojo.Log.error('**************** EVENT #433: '+servers.servers[id].state);
		//for (var p = 0; p < params.length; p++) Mojo.Log.error('**************** * '+p+': '+params[p]);
		
		if (servers.servers[id].state == servers.servers[id].STATE_CONNECTED)
		{
			servers.servers[id].newMessage('debug', false, msg[0] = params[1] + " : " + params[2]);
		}
		else if (servers.servers[id].state == servers.servers[id].STATE_CONNECTING)
		{
			if (servers.servers[id].nextNick < prefs.get().nicknames.length)
			{	// first try nicks in the list
				servers.servers[id].newMessage('debug', false, 'Trying next nick [' + servers.servers[id].nextNick + '] - ' + prefs.get().nicknames[servers.servers[id].nextNick]);
				servers.servers[id].setNick.bind(servers.servers[id]).defer(prefs.get().nicknames[servers.servers[id].nextNick]);
				servers.servers[id].nextNick = servers.servers[id].nextNick + 1;
			}
			else if (servers.servers[id].nextNick < prefs.get().nicknames.length + 3)
			{	// second, try adding _'s to the default nick
				var tryNextNick = servers.servers[id].defaultNick ? servers.servers[id].defaultNick : prefs.get().nicknames[0];
				if ((tryNextNick.length + ((servers.servers[id].nextNick + 1) - prefs.get().nicknames.length)) >= 16) tryNextNick = tryNextNick.substr(0, (16 - ((servers.servers[id].nextNick + 1) - prefs.get().nicknames.length)));
				for (var n = 0; n <= (servers.servers[id].nextNick - prefs.get().nicknames.length); n++) tryNextNick += '_';
				servers.servers[id].newMessage('debug', false, 'Trying generated nick [' + servers.servers[id].nextNick + '] - ' + tryNextNick);
				servers.servers[id].setNick.bind(servers.servers[id]).defer(tryNextNick);
				servers.servers[id].nextNick = servers.servers[id].nextNick + 1;
			}
			else
			{	// third? give up!
				servers.servers[id].newMessage('debug', false, 'No more nicks to try!');
				servers.servers[id].disconnect.bind(servers.servers[id]).defer();
			}
		}
	}

}

wircPluginModel.prototype.event_unknown_handler = function(id, event, origin, params_s)
{
	var params = wircPluginModel.jsonParse(params_s);
	
	switch (event) {
		case 'PONG':
			if (!prefs.get().lagMeter)
				servers.servers[id].newMessage('type77', false, event + ' ' + params[0] + ' ' + params[1]);
			break;
		default:
			servers.servers[id].debugPayload(params, false);
			break;	
	}
}

wircPluginModel.prototype.event_rtt_handler = function(id, rtt)
{
	var id = parseInt(id);
	
	if (prefs.get().lagMeter)
	{
		servers.servers[id].lagHistory.push(parseInt(rtt));
		if (servers.servers[id].lagHistory.length>5)
			servers.servers[id].lagHistory.shift();
		
		var lagSum = 0;
		servers.servers[id].lagHistory.forEach(function(x) {lagSum += x;});
		var aveLag = lagSum / servers.servers[id].lagHistory.length;
			
		if (aveLag<300)
			servers.servers[id].lag = 'lag-5';
		else if (aveLag<600)
			servers.servers[id].lag = 'lag-4';
		else if (aveLag<1200)
			servers.servers[id].lag = 'lag-3';
		else if (aveLag<2400)
			servers.servers[id].lag = 'lag-2';
		else
			servers.servers[id].lag = 'lag-1';
		
		if (servers.listAssistant && servers.listAssistant.controller)
		{
			servers.listAssistant.updateList();	
		}
		if (servers.servers[id].statusAssistant && servers.servers[id].statusAssistant.controller)
		{
			servers.servers[id].statusAssistant.updateLagMeter();
		}
		for (var c = 0; c < servers.servers[id].channels.length; c++)
		{
			servers.servers[id].channels[c].updateLagMeter();
		}
		for (var q = 0; q < servers.servers[id].queries.length; q++)
		{
			servers.servers[id].queries[q].updateLagMeter();
		}
	}
	
}