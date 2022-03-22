Module.register("humidity",{
    //Defaults
    defaults: {
      ClientID: "TEST", // No change
      Stats: "total", // no change
      StatsResult: "EMPTY", // no change
      StatsText: "Loading", // no change
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
        var url = "REDACTED";

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
    // Load Style
    getStyles: function(){
      return [
          'style.css',
      ]
    },
  
    // receiving stats from api
  
    getStats: function(){
        var url = "REDACTED";

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
        var data = JSON.parse(xhr.responseText)
        self.config.StatsResult = data
        self.generateStatsText()
        
    },
  
    // The displayed text
  
    generateStatsText: function() {
      if(this.config.StatsResult != "EMPTY"){
        var stats = this.config.StatsResult
        this.config.StatsText = "Greenhouse: " + stats.greenhouseID + "Time: " + stats.time + "Value: " + stats.measure_value
        this.updateDom()
        }
        console.log(this.config.StatsResult)
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
      var stats = document.createElement("P");
      wrapper.appendChild(body)
      body.appendChild(div)
      div.appendChild(stats)
      wrapper.appendChild(title);
  
      stats.innerHTML = this.config.StatsText
  
      return wrapper;
    }
  
  });
