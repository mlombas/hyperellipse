class CanvasMouseListener {
   constructor(canvas) {
      this.canvas = canvas;
      this.canvas.addEventListener("mousedown", 
         (evt) => this._handleRaw(evt)
      );

      this.handlers = {
         right: [],
         middle: [],
         left: []
      };
   }

   _handleRaw(evt) {
      var coordinates = this._getCoordinates(evt);

      switch(evt.button) {
         case 0: this._handleLeft(coordinates, evt); break;
         case 1: this._handleMiddle(coordinates, evt); break;
         case 2: this._handleRight(coordinates, evt); break;
      }
   }

   _getCoordinates(evt) {
      var rect = this.canvas.getBoundingClientRect();
      var style = getComputedStyle(canvas).getPropertyValue("border-width");
      var borderWidths = parseInt(style.substring(0, style.length - 2));

      return coordinates = {
         x: evt.clientX - rect.left - borderWidths,
         y: evt.clientY - rect.top - borderWidths
      };
   }

   _handleLeft(coordinates, evt) {
      this.handlers.left.forEach(handler => handler(coordinates, evt));
   }

   _handleMiddle(coordinates, evt) {
      this.handlers.middle.forEach(handler => handler(coordinates, evt));
   }

   _handleRight(coordinates, evt) {
      this.handlers.right.forEach(handler => handler(coordinates, evt));
   }
   
   addRightClickHandler(func) {
      this.handlers.right.push(func);
   }

   addLeftClickHandler(func) {
      this.handlers.left.push(func);
   }

   addMiddleClickHandler(func) {
      this.handlers.right.push(func);
   }
}
