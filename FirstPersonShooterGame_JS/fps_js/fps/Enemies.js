class Enemies {
  constructor (scene, level) {

    this.enemies = [];
    this.countVirus = [];
    this.direction = [];
    this.force = 0;
    this.init = true;
    this.countDead = 0;

    this.scene = scene;

    if(level == 1)
      this.force = 5;
    else if (level == 2)
      this.force = 10;
    else if (level == 3)
      this.force = 20;
    else if (level == 4)
      this.force = 30;
    else
      this.force = 50;

    var loader = new THREE.TextureLoader();
    var virus = loader.load ("imgs/virus.png");

    this.mat1 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: virus}), 0, 0);
    this.mat2 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: virus}), 0, 0);
    this.mat3 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: virus}), 0, 0);
    this.mat4 = Physijs.createMaterial(new THREE.MeshPhongMaterial ({map: virus}), 0, 0);
    
    var dummy1 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat1, 1);
    dummy1.applyMatrix (new THREE.Matrix4().makeTranslation (100, 7, -150));
    dummy1.receiveShadow = true;
    dummy1.autoUpdateMatrix = false;
    this.countVirus.push(0);
    this.direction.push("left");
    this.enemies.push(dummy1);
    this.scene.add(dummy1);
    this.addBulletListener(this.enemies.length-1);

    var dummy2 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat2, 1);
    dummy2.applyMatrix (new THREE.Matrix4().makeTranslation (-100, 7, -250));
    dummy2.receiveShadow = true;
    dummy2.autoUpdateMatrix = false;
    this.countVirus.push(0);
    this.direction.push("right");
    this.enemies.push(dummy2);
    this.scene.add(dummy2);
    this.addBulletListener(this.enemies.length-1);

    var dummy3 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat3, 1);
    dummy3.applyMatrix (new THREE.Matrix4().makeTranslation (100, 7, -350));
    dummy3.receiveShadow = true;
    dummy3.autoUpdateMatrix = false;
    this.countVirus.push(0);
    this.direction.push("left");
    this.enemies.push(dummy3);
    this.scene.add(dummy3);
    this.addBulletListener(this.enemies.length-1);

    var dummy4 = new Physijs.BoxMesh (new THREE.BoxGeometry (7.5, 10, 2.5, 1, 1, 1), this.mat4, 1);
    dummy4.applyMatrix (new THREE.Matrix4().makeTranslation (-100, 7, -450));
    dummy4.receiveShadow = true;
    dummy4.autoUpdateMatrix = false;
    this.countVirus.push(0);
    this.direction.push("right");
    this.enemies.push(dummy4);
    this.scene.add(dummy4);
    this.addBulletListener(this.enemies.length-1);
    return this;
  }

  addBulletListener(i) {
    var that = this;
    this.enemies[i].addEventListener ( 'collision' , function (object , kecepatan , rotasi , normal) {
      if (that.countVirus[i] == 1) {
        scene.updateScore(10);
        that.countDead++;
        if(that.countDead == 4){
          scene.level++;
          scene.newLevel();
        }
      }
      that.countVirus[i]++;
    });
  }

  getEnemies(i) {
    return this.enemies[i];
  }

  getEnemiesPlus() {
    return this.enemies.length;
  }

  animate() {
     for (var i = 0; i < this.enemies.length; ++i) {
      if (this.enemies[i].position.x >= 100 && this.direction[i] == "left") {
         this.enemies[i].applyCentralImpulse(new THREE.Vector3(-this.force,0,0));
        this.direction[i] = "right";
      }
       else if (this.enemies[i].position.x <= -100 && this.direction[i] == "right") { 
         this.enemies[i].applyCentralImpulse(new THREE.Vector3(this.force,0,0));
         this.direction[i] = "left";
      }
      if(this.init) {
        this.force*=2;
        this.init = false;
      }
      if (this.enemies[0].position.z != -150 && this.enemies[1].position.z != -250 && 
        this.enemies[2].position.z != -350 && this.enemies[3].position.z != -450) {
        scene.level++;
        scene.newLevel();
      }
    }
  }

}
