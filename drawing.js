class Drawer {
   constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");

      this.color = "#000000";

      this.points = new Points();
      this.prev = [];
   }

   setColor(color) {
      //Erase points
      this.color = "#FFFFFF";
      this.points.points.forEach(p => this._drawPoint(p));

      //Draw new ones
      this.color = color;
      this.points.points.forEach(p => this._drawPoint(p));
   }

   add(point) {
      this._drawPoint(point);
      this.points.addPoint(point);
   }

   stroke(distance, step) {
      step = step || 0.112;
      
      this._clear();

      let newPath = {
         path: [],
         color: this.color
      }

      for(let x = 0; x <= this.canvas.width; x += step)
         for(let y = 0; y <= this.canvas.height; y += step) {
            let p = {x: x, y: y};
            if(this.points.isValidPoint(p, distance))
               newPath.path.push(p);
         }

      this.prev.push(newPath);

      this._drawPaths();

      this.points = new Points();
   }

   _clear() {
      this.ctx.save();
      
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.ctx.restore();
   }

   _drawPoint(point, color) {
      color = color || this.color;
      this.ctx.save();

      this.ctx.fillStyle = color;
      this.ctx.fillRect(point.x - .5, point.y - .5, 1, 1);

      this.ctx.restore();
   }

   _drawPaths() {
      this.prev.forEach(prev => this._drawPath(prev.path, prev.color));
   }

   _drawPath(path, color) {
      this.ctx.save();
      
      path.forEach(point => 
         this._drawPoint(point, color));

      this.ctx.restore();
   }
}
