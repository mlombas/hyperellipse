class Points {
   constructor() {
      this.points = [];
   }

   addPoint(point) {
      this.points.push(point);
   }

   isValidPoint(point, distance) {
      let accLengths = this.points.reduce((acc, internal) => {
         let distance = this._calcDistance(point, internal);
         return acc + distance;
      }, 0);

      return this._approximatelyEquals(accLengths, distance);
   }

   _approximatelyEquals(a, b, epsilon) {
      epsilon = epsilon || 1;

      return Math.abs(a - b) <= epsilon;
   }

   _calcDistance(p1, p2) {
      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      return Math.sqrt(dx*dx + dy*dy);
   }
}
