import { useEffect, useRef } from 'react';
import {  GridHelper, OrthographicCamera, Scene, Sprite, SpriteMaterial, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons';
import { World, Vec3, Body, Box, Material, Sphere } from 'cannon-es'
// import CannonDebugger from 'cannon-es-debugger'


const CAPSULE_ECOUNT = 20
const BALL_SIZE = 3

export function Background() {
  const ref = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)
  
  useEffect(() => {
    if (initialized.current) {
      return
    }
    initialized.current = true
    
    const canvas = ref.current
    if (canvas == null) {
      return
    }
    const scene = new Scene();
    const camera = new OrthographicCamera(-10, +10, 20 * window.innerHeight / window.innerWidth , 0, 1, 1000);
    camera.position.z = 5;

    const renderer = new WebGLRenderer();
    renderer.setClearColor("white")
    renderer.setSize(window.innerWidth, window.innerHeight);

    canvas.appendChild(renderer.domElement);
    
    {
      const grid = new GridHelper(25);
      scene.add(grid);
    }
    
    {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.2;
    }

    const sprites = Array(CAPSULE_ECOUNT).fill(null).map(() => {
      const map = new TextureLoader().load('capsule.png');
      const material2 = new SpriteMaterial({ map, });
      const sprite = new Sprite(material2);
      sprite.position.x = Math.random() * 10 - 5;
      sprite.position.y = Math.random() * 10 * window.innerHeight / window.innerWidth;
      sprite.position.z = 0;
      sprite.scale.x = BALL_SIZE
      sprite.scale.y = BALL_SIZE
      scene.add(sprite);
      return sprite
    })

    const world = new World({
      gravity: new Vec3(0, -9.82, 0),
    });
  
    {
      // Boxで囲まれた空間を作る
      const size = 10;
      [
        [size, 0.01, size,],
        [size, 0.01, size,],
        [0.01, 10 * window.innerHeight / window.innerWidth, size,],
        [0.01, 10 * window.innerHeight / window.innerWidth, size,],
      ].map(([x, y, z], i) => {
        const shape = new Box(new Vec3(x, y, z));
        const body = new Body({
          mass: 0, // static
          shape,
          material: new Material({
            restitution: 0.5,
          }),
          position: i === 0 ? new Vec3(0, 0, 0) : i === 1 ? new Vec3(0, 20 * window.innerHeight / window.innerWidth, 1) : i === 2 ? new Vec3(-10, 10 * window.innerHeight / window.innerWidth, 0) : i === 3 ? new Vec3(10, 10 * window.innerHeight / window.innerWidth, 0) : i === 4 ? new Vec3(0, 0, 20) : i === 5 ? new Vec3(0, 0, 20) : new Vec3(0, 0, 0)
        });
        world.addBody(body);
      })
    }

    const sphereBodys = sprites.map(({ position: { x, y, z } }) =>  {
      const sphereBody =  new Body({
        mass: 5,
        shape: new Sphere(BALL_SIZE / 2),
        position: new Vec3(x, y, z),
        material: new Material({
          restitution: 1,
        }),
      });
      world.addBody(sphereBody);
      return sphereBody
    });
    
    function animate() {
      world.fixedStep();
      // cannonDebugger.update();

      for (let i = 0; i < sphereBodys.length; i++) {
        sprites[i].position.x = sphereBodys[i].position.x
        sprites[i].position.y = sphereBodys[i].position.y
        sprites[i].position.z = sphereBodys[i].position.z

        sprites[i].quaternion.x = sphereBodys[i].quaternion.x
        sprites[i].quaternion.y = sphereBodys[i].quaternion.y
        sprites[i].quaternion.z = sphereBodys[i].quaternion.z
        sprites[i].quaternion.w = sphereBodys[i].quaternion.w
      }
      
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('deviceorientation',  (e) => {
      //加速度を取得
      // const alpha = e.alpha;
      const beta = e.beta;
      const gamma = e.gamma;
      console.log(beta, gamma)
      // if(alpha != null)
      //   world.gravity.x = alpha / 360 * 9.8
      if(beta != null)
        world.gravity.y = -beta / 30 * 9.8
      if(gamma != null)
      world.gravity.x = gamma / 30 * 9.8
    })
  }, [])


  return (
    <div ref={ref} className="fixed inset-0"  />
  )
}

