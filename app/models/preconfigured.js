var preconfigured = [

	// OFTC
	{network: 'OFTC',		region: '',			 		subregion: '', 						address: 'irc.oftc.net'},

	// Freenode
	{network: 'Freenode',	region: '',			 		subregion: '', 						address: 'irc.freenode.net'},
		
	// Freenode (Europe)
	{network: 'Freenode',	region: 'Europe', 			subregion: '', 						address: 'chat.eu.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Frankfurt, DE',			address: 'kornbluth.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Helsinki, FI',			address: 'orwell.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Milano, IT',			address: 'calvino.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Umeå, SE',				address: 'leguin.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Moscow, RU',			address: 'lem.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Manchester, UK',		address: 'wolfe.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Vilnius, LT',			address: 'sendak.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Evry, FR',				address: 'jordan.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Stockholm, SE',			address: 'lindbohm.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'London, UK',			address: 'holmes.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Paris, FR',				address: 'barjavel.freenode.net'},
	{network: 'Freenode',	region: 'Europe', 			subregion: 'Luxembourg, LU',		address: 'bartol.freenode.net'},
	{network: 'Freenode',	region: 'Europe',			subregion: 'Rennes, FR',			address: 'pratchett.freenode.net'},
	
	// Freenode (United States)
	{network: 'Freenode',	region: 'United States',	subregion: '',						address: 'chat.us.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Corvallis, OR',			address: 'niven.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Corvallis, OR',			address: 'zelazny.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Madison, WI',			address: 'brown.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Irvine, CA',			address: 'anthony.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Los Angeles, CA',		address: 'kubrick.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Newark, NJ',			address: 'verne.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Fremont, CA',			address: 'clarke.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Washington, DC',		address: 'card.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'San Diego, CA',			address: 'simmons.freenode.net'},
	{network: 'Freenode',	region: 'United States',	subregion: 'Pittsburgh, PA',		address: 'hubbard.freenode.net'},
	
	// Rizon
	{network: 'Rizon',		region: '',					subregion: '',						address: 'irc.rizon.net'},
	
	// Rizon (Europe)
	{network: 'Rizon',		region: 'Europe',			subregion: 'DE',					address: 'irc.zipd.de'},
	{network: 'Rizon',		region: 'Europe',			subregion: 'FR',					address: 'irc.lolipower.org'},
	{network: 'Rizon',		region: 'Europe',			subregion: 'NL',					address: 'irc.impact-media.me.uk'},
	{network: 'Rizon',		region: 'Europe',			subregion: 'NO',					address: 'irc.rizon.no'},
	{network: 'Rizon',		region: 'Europe',			subregion: 'UK',					address: 'irc.shakeababy.net'},
	
	// Rizon (North America)
	{network: 'Rizon',		region: 'North America',	subregion: 'CA',					address: 'irc.thefear.ca'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.ashenworlds.net'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.cccp-project.net'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.cyberdynesystems.net'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.dronebl.org'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.gamepad.ca'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.nitemare.name'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.nuu.cc'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.pantsuland.net'},
	{network: 'Rizon',		region: 'North America',	subregion: 'US',					address: 'irc.x1n.org'},

	// Rizon (Asia)
	{network: 'Rizon',		region: 'Asia',				subregion: 'RU',					address: 'irc.fujibayashi.jp'},
	
	// EFnet (CA)
	{network: 'EFnet',		region: 'CA',				subregion: 'Calgary, AB',			address: 'irc.arcti.ca'},
	{network: 'EFnet',		region: 'CA',				subregion: 'Montreal, QC',			address: 'irc.choopa.ca'},
	{network: 'EFnet',		region: 'CA',				subregion: 'Toronto, ON',			address: 'irc.igs.ca'},
	
	// EFnet (EU)
	{network: 'EFnet',		region: 'EU',				subregion: 'Helsinki, FI',			address: 'efnet.cs.hut.fi'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Stockholm, Sweden',		address: 'efnet.port80.se'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Amsterdam, NL',			address: 'efnet.xs4all.nl'},
	{network: 'EFnet',		region: 'EU',				subregion: 'South Africa',			address: 'irc.ac.za'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Oslo, Norway',			address: 'irc.daxnet.no'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Borlange, Sweden',		address: 'irc.du.se'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Geneva, Switzerland',	address: 'irc.efnet.ch'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Paris, France',			address: 'irc.efnet.fr'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Ede, Netherlands',		address: 'irc.efnet.nl'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Oslo, Norway',			address: 'irc.efnet.no'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Warsaw, Poland',		address: 'irc.efnet.pl'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Moscow, Russia',		address: 'irc.efnet.ru'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Oslo, Norway',			address: 'irc.homelien.no'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Aarhus, Denmark',		address: 'irc.inet.tele.dk'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Tel Aviv, Israel',		address: 'irc.inter.net.il'},
	{network: 'EFnet',		region: 'EU',				subregion: 'Stockholm, Sweden',		address: 'irc.swepipe.se'},
	
	// EFnet (US)
	{network: 'EFnet',		region: 'US',				subregion: 'Dallas, TX',			address: 'irc.blessed.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'New York, NY',			address: 'irc.choopa.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'Orlando, FL',			address: 'irc.colosolutions.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'Phoenix, AZ',			address: 'irc.easynews.com'},
	{network: 'EFnet',		region: 'US',				subregion: 'Miami, FL',				address: 'irc.eversible.com'},
	{network: 'EFnet',		region: 'US',				subregion: 'Fremont, CA',			address: 'irc.he.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'Los Angeles, CA',		address: 'irc.mzima.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'New York, NY',			address: 'irc.nac.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'Houston, TX',			address: 'irc.paraphysics.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'San Francisco, CA',		address: 'irc.Prison.NET'},
	{network: 'EFnet',		region: 'US',				subregion: 'Chicago, IL',			address: 'irc.servercentral.net'},
	{network: 'EFnet',		region: 'US',				subregion: 'Dulles, Va',			address: 'irc.SHOUTcast.com'},
	{network: 'EFnet',		region: 'US',				subregion: 'Ann Arbor, MI',			address: 'irc.umich.edu'},
	{network: 'EFnet',		region: 'US',				subregion: 'Minneapolis, MN',		address: 'irc.umn.edu'},
	{network: 'EFnet',		region: 'US',				subregion: 'Reston, VA',			address: 'irc.wh.verio.net'},
	
	// Undernet
	{network: 'Undernet',	region: 'CA',				subregion: 'Vancouver, BC',			address: 'Vancouver.BC.CA.Undernet.org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Bucharest, RO',			address: 'bucharest.ro.eu.undernet.org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Diemen, NL',			address: 'Diemen.NL.EU.Undernet.Org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Ede, NL',				address: 'Ede.NL.EU.UnderNet.Org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Elsene, BE',			address: 'Elsene.Be.Eu.undernet.org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Graz, AT',				address: 'graz.at.Eu.UnderNet.org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Helsinki, FI',			address: 'Helsinki.FI.EU.Undernet.org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Lelystad, NL',			address: 'Lelystad.NL.EU.UnderNet.Org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Olso, NO',				address: 'oslo.no.eu.undernet.org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Trondheim, NO',			address: 'trondheim.no.eu.undernet.org'},
	{network: 'Undernet',	region: 'EU',				subregion: 'Zagreb, HR',			address: 'Zagreb.Hr.EU.UnderNet.org'},
	{network: 'Undernet',	region: 'US',				subregion: 'Dallas, TX',			address: 'Dallas.TX.US.Undernet.org'},
	{network: 'Undernet',	region: 'US',				subregion: 'Mesa, AZ',				address: 'mesa.az.us.undernet.org'},
	{network: 'Undernet',	region: 'US',				subregion: 'Mesa, AZ',				address: 'mesa2.az.us.undernet.org'},
	{network: 'Undernet',	region: 'US',				subregion: 'New York, NY',			address: 'newyork.ny.us.undernet.org'},
	{network: 'Undernet',	region: 'US',				subregion: 'SantaAna, CA',			address: 'SantaAna.CA.US.Undernet.org'},
	{network: 'Undernet',	region: 'US',				subregion: 'Tampa, FL',				address: 'Tampa.FL.US.Undernet.org'},

];

