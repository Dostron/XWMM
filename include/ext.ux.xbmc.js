
function xbmcJsonRPC(params) {
	var inputUrl = '/jsonrpc'
	var myjson = '';
	Ext.Ajax.request({
		url: inputUrl,
		params : params,
		method: "POST",
		async: false,
		success: function (t){
			myjson = Ext.util.JSON.decode(t.responseText);
			},
		failure: function(t){},
			timeout: 5000
	});	
	return myjson.result;
}

// Name space for XBMC objects

Ext.namespace('Ext.ux');
 
/**
  * Ext.ux.XbmcStore Extension Class
  * @author nicolas
  * @version 1.0
  * @class Ext.ux.XbmcStore
  * @extends Ext.Data.Store
  * @constructor
  * @param {Object} config Configuration options
  *		xbmcParams :	XBMC JSON-RPC parameters (string)
  * 	loadXbmc : 		function to load from XBMC (no params)
  */
  
Ext.ux.XbmcStore = function(config) {
    Ext.ux.XbmcStore.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.XbmcStore, Ext.data.Store, {
 	// load from XBMC via JSON-RPC
	loadXbmc: function() {
		 var json = xbmcJsonRPC(this.xbmcParams);
		 this.loadData(json)
	}, 
	// JSON-RPC parameters
	xbmcParams : String,
	proxy: new Ext.data.MemoryProxy(),
}); 

/**
  * Ext.ux.XbmcImages Extension Class
  * @author nicolas
  * @version 1.0
  * @class Ext.ux.XbmcImages
  * @extends Ext.Container
  * @constructor
  */

Ext.ux.XbmcImages = function(config) {
    Ext.ux.XbmcImages.superclass.constructor.call(this, config);
}; 

Ext.extend(Ext.ux.XbmcImages, Ext.Container, {
	// refresh image
	refreshMe : function(){
		this.el.dom.src =  this.el.dom.src + '?dc=' + new Date().getTime();
	},
	// set source image
	updateSrc :function(imagePath){
		this.el.dom.src = "/vfs/"+imagePath;
	}
}); 

/**
  * Ext.ux.XbmcStars Extension Class
  * @author nicolas
  * @version 1.0
  * @class Ext.ux.XbmcStars
  * @extends Ext.Container
  * @constructor
  */

Ext.ux.XbmcStars = function(config) {
 
    // call parent constructor
    Ext.ux.XbmcStars.superclass.constructor.call(this, config);
 
}; 

Ext.extend(Ext.ux.XbmcStars, Ext.Container, {
	border: 0,
	autoEl: {tag: 'img', src: "../images/stars/0.png"},
	updateSrc :function(r){
		var value = Math.round(r.data.rating);
		this.el.dom.src =  '../images/stars/'+value+'.png';
	}
}); 
