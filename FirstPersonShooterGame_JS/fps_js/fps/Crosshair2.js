class Crosshair2 extends THREE.Object3D {
  constructor () {
    super();
    this.material = new THREE.LineBasicMaterial({ color: 0x23ff02 });
    this.xLenght = 0.0007;
    this.yLenght = 0.005;
    this.zLenght = 0.0;
    this.crosshairPos = 0.0075;
    this.crosshair = null;
    this.crosshair = this.createRoot();
    this.add (this.crosshair);
  }
  
  createRoot() {
    var root = new THREE.Object3D();
    root.castShadow = false;
    root.autoUpdateMatrix = false;
    root.updateMatrix();
    root.add(this.createCrosshair("U"));
    return root;
  }

  createCrosshair() {
    var rectangle = new THREE.Mesh (new THREE.BoxGeometry (this.yLenght, this.xLenght, this.zLenght), this.material);
    rectangle.castShadow = false;
    rectangle.autoUpdateMatrix = false;
    rectangle.updateMatrix();
    return rectangle;
  }
}