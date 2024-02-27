module.exports = {
  apps : [{
    name   : "cawwi",
    script : "./dist/index.js",
    watch:true,
    ignore_watch:["servers"]
  }]
}
