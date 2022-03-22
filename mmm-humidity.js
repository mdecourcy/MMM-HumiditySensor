Module.register("mmm-humidity",{
    //Defaults
    defaults: {
      ClientID: "", 
      Stats: "", 
      StatsResult: "", 
      StatsText: "Loading",
      UpdateInterval: 30 // In seconds
    },
    // define scripts
    getScripts: function() {
      return [
          'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',  // this file will be loaded from the jquery servers.
      ]
    },
    // LOADING API
    start: function(){
        var url = "https://eknqepv86f.execute-api.us-east-1.amazonaws.com/database/timestream";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        
        xhr.setRequestHeader("moduleid", "1002");
        xhr.setRequestHeader("measurename", "humidity");
        
        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
              console.log(xhr.status);
              console.log(xhr.responseText);
           }};
        
      xhr.send();
      this.startUpdateLoop()
    },
    // Load Styles
    getStyles: function(){
      return [
          'style.css',
      ]
    },
  
    // receiving stats from api
  
    getStats: function(){
        var url = "https://eknqepv86f.execute-api.us-east-1.amazonaws.com/database/timestream";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        
        xhr.setRequestHeader("moduleid", "1002");
        xhr.setRequestHeader("measurename", "humidity");
        var self = this
 
        xhr.onreadystatechange = function () {
           if (xhr.readyState === 4) {
              console.log(xhr.status);
              console.log(xhr.responseText);
		self.config.StatsResult = JSON.parse(xhr.responseText)
		self.generateStatsText()
           }};
        xhr.send();
	console.log("Stats result: " + JSON.stringify(this.config.statsResult))
        
    },
  
    // The displayed text
    generateStatsText: function() {
      if(this.config.StatsResult != "EMPTY"){
        var stats = this.config.StatsResult
        this.config.StatsText = `Greenhouse ID: ${stats.greenhouseID} Time: ${stats.time} Value: ${stats.measure_value}`
        this.updateDom()
        }
        
    },
  
    // Change Stats
  
    updateStats: function(){
        this.getStats();
    },
  
    startUpdateLoop: function(){
      setInterval(() => {
        this.updateStats()
      }, this.config.UpdateInterval * 1000);
    },
  
    // Override dom generator
    getDom: function(){
      var wrapper = document.createElement("stats");
      var title = document.createElement("header");
      title.innerHTML = "Greenhouse Stats"
      var body = document.createElement("body");
      var div = document.createElement("div");
      var stats = document.createElement("p");
      wrapper.appendChild(body)
      body.appendChild(div)
      div.appendChild(stats)
      wrapper.appendChild(title);
  
      stats.innerHTML = this.config.StatsText
  
      return wrapper;
    }
  
  });
