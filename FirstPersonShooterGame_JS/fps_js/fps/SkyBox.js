class Skybox extends THREE.Object3D {
  constructor() {
    super();
    this.lenght = 1000;
    this.height = 500;
    this.skybox = null;

    var geometry = new THREE.BoxGeometry(this.lenght, this.height, this.lenght);
    var loader = new THREE.TextureLoader();
    // var loader = new THREE.CubeTextureLoader();
    // var material = loader.load([
    // 'imgs/SkyBox/px.png',
    // 'imgs/SkyBox/nx.png',
    // 'imgs/SkyBox/py.png',
    // 'imgs/SkyBox/ny.png',
    // 'imgs/SkyBox/pz.png',
    // 'imgs/SkyBox/nz.png',
    // ]);

    var material = new THREE.MeshBasicMaterial({
      map: loader.load(
        'imgs/SkyBox/py.png',
      ),
      side: THREE.BackSide
    });

    this.skybox = new THREE.Mesh(geometry, material);
    this.skybox.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    this.add(this.skybox);
  }

}
