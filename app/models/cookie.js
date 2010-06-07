function preferenceCookie()
{
	this.cookie = false;
	this.prefs = false;
	this.load();
};
preferenceCookie.prototype.get = function(reload)
{
	try 
	{
		if (!this.prefs || reload) 
		{
			// setup our default preferences
			this.prefs = 
			{
				// Global Group
				theme:				'palm-default',
				piface:				'',
				aiface:				false,
				lagMeter:			false,
				connectionTimeout:	30,
				blockScreenTimeout:	true,
				dimScreen:			true,
				
				// Identity Scene
				realname:			'',
				nicknames:			[],
				
				// Server Status Group
				statusPop:			false,
				
				// Input Group
				tabSuffix:			':',
				autoCap:			false,
				autoReplace:		true,
				
				// Messages Group
				messagesStyle:		'lefta',
				messageSplit:		'25',
				fontSize:			'15',
				timeStamp:			5,
				timeStampStyle:		'default',
				senderColoring:		true,
				
				// Highlight Group
				highlightStyle:		'color',
				highlightPart:		'all',
				alertWords:			'',
				
				// Dashboard/Banner Group
				dashboardChannel:		true,
				dashboardChannelSound:	true,
				dashboardQuerySound:	true,
				inviteAction:			'prompt',
				dashboardInviteSound:	true,
				
				// Color scheme
				colorNotice:		'orangered',
				colorAction:		'firebrick',
				colorStatus:		'mediumpurple',
				colorText:			'black',
				colorMarker:		'red',
				colorHighlightFG:	'black',
				colorHighlightBG:	'lightpink',
				colorOwnNick:		'black',
				colorOtherNicks:	'green',
				
				// Events
				eventJoin:			true,
				eventPart:			true,
				eventQuit:			true,
				eventMode:			true
			};
			
			// uncomment to delete cookie for testing
			//this.cookie.remove();
			var cookieData = this.cookie.get();
			if (cookieData) 
			{
				for (i in cookieData) 
				{
					this.prefs[i] = cookieData[i];
				}
			}
			else 
			{
				this.put(this.prefs);
			}
		}
		
		return this.prefs;
	} 
	catch (e) 
	{
		Mojo.Log.logException(e, 'preferenceCookie#get');
	}
};
preferenceCookie.prototype.put = function(obj, value)
{
	try
	{
		this.load();
		if (value)
		{
			this.prefs[obj] = value;
			this.cookie.put(this.prefs);
		}
		else
		{
			this.cookie.put(obj);
		}
	} 
	catch (e) 
	{
		Mojo.Log.logException(e, 'preferenceCookie#put');
	}
};
preferenceCookie.prototype.load = function()
{
	try
	{
		if (!this.cookie) 
		{
			this.cookie = new Mojo.Model.Cookie('preferences');
		}
	} 
	catch (e) 
	{
		Mojo.Log.logException(e, 'preferenceCookie#load');
	}
};

function versionCookie()
{
	this.cookie = false;
	this.isFirst = false;
	this.isNew = false;
	//this.init();
};
versionCookie.prototype.init = function()
{
	try
	{
		// reset these
		this.cookie = false;
		this.isFirst = false;
		this.isNew = false;
		
		this.cookie = new Mojo.Model.Cookie('version');
		// uncomment to delete cookie for testing
		//this.cookie.remove();
		var data = this.cookie.get();
		if (data)
		{
			if (data.version == Mojo.appInfo.version)
			{
				//alert('Same Version');
			}
			else
			{
				//alert('New Version');
				this.isNew = true;
				this.put();
			}
		}
		else
		{
			//alert('First Launch');
			this.isFirst = true;
			this.isNew = true;
			this.put();
		}
		// uncomment to delete cookie for testing
		//this.cookie.remove();
	}
	catch (e) 
	{
		Mojo.Log.logException(e, 'versionCookie#init');
	}
};
versionCookie.prototype.put = function()
{
	this.cookie.put({version: Mojo.appInfo.version});
	// uncomment to set lower version for testing
	//this.cookie.put({version: '0.0.1'});
};
versionCookie.prototype.showStartupScene = function()
{
	if (this.isNew || this.isFirst) return true;
	else return false;
};
