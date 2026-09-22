/* Premium Colorful 3D Background */
(() => {
  const canvas = document.getElementById("bg");
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x09051a, 0.035);

  const camera = new THREE.PerspectiveCamera(
    55,
    innerWidth / innerHeight,
    0.1,
    120
  );

  camera.position.set(0, 0, 18);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x050316, 1);

  /* =========================
     LIGHTS
  ========================= */

  scene.add(new THREE.AmbientLight(0xffffff, 0.22));

  const lights = [
    [0x7c3cff, -7, 4, 5, 7],
    [0x00d9ff, 7, 2, 4, 7],
    [0xff2fb3, 0, -5, 3, 6],
    [0xffb300, 4, -2, -2, 4]
  ];

  lights.forEach(([color, x, y, z, intensity]) => {
    const light = new THREE.PointLight(
      color,
      intensity,
      30
    );

    light.position.set(x, y, z);
    scene.add(light);
  });

  /* =========================
     COLORFUL PARTICLES
  ========================= */

  const count = innerWidth < 700 ? 900 : 1800;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const palette = [
    new THREE.Color(0x7c3cff),
    new THREE.Color(0x00e5ff),
    new THREE.Color(0xff2fb3),
    new THREE.Color(0xffb300),
    new THREE.Color(0x39ff88)
  ];

  for (let i = 0; i < count; i++) {

    const radius = 4 + Math.random() * 30;
    const angle = Math.random() * Math.PI * 2;

    positions[i * 3] =
      Math.cos(angle) * radius;

    positions[i * 3 + 1] =
      (Math.random() - 0.5) * 22;

    positions[i * 3 + 2] =
      Math.sin(angle) * radius - 5;

    const color =
      palette[
        Math.floor(Math.random() * palette.length)
      ];

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const particleGeometry =
    new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(
      colors,
      3
    )
  );

  const particleMaterial =
    new THREE.PointsMaterial({

      size: 0.075,

      vertexColors: true,

      transparent: true,

      opacity: 0.82,

      blending:
        THREE.AdditiveBlending,

      depthWrite: false
    });

  const stars =
    new THREE.Points(
      particleGeometry,
      particleMaterial
    );

  scene.add(stars);

  /* =========================
     GLOWING ORBIT RINGS
  ========================= */

  const rings = [];

  const ringData = [
    [5.5, 0x7c3cff, 0.34, 0.12],
    [7.5, 0x00d9ff, -0.22, 0.09],
    [9.5, 0xff2fb3, 0.16, 0.07]
  ];

  ringData.forEach(
    ([radius, color, tilt, speed]) => {

      const geometry =
        new THREE.TorusGeometry(
          radius,
          0.045,
          12,
          180
        );

      const material =
        new THREE.MeshBasicMaterial({

          color,

          transparent: true,

          opacity: 0.48,

          blending:
            THREE.AdditiveBlending,

          depthWrite: false
        });

      const ring =
        new THREE.Mesh(
          geometry,
          material
        );

      ring.rotation.x = tilt;

      ring.rotation.y =
        Math.random();

      ring.userData.speed =
        speed;

      scene.add(ring);

      rings.push(ring);
    }
  );

  /* =========================
     FLOATING CRYSTALS
  ========================= */

  const crystals = [];

  const crystalColors = [
    0x7c3cff,
    0x00e5ff,
    0xff2fb3,
    0xffb300,
    0x39ff88
  ];

  for (let i = 0; i < 14; i++) {

    const size =
      0.25 + Math.random() * 0.65;

    const geometry =
      new THREE.IcosahedronGeometry(
        size,
        1
      );

    const color =
      crystalColors[
        i % crystalColors.length
      ];

    const material =
      new THREE.MeshPhysicalMaterial({

        color,

        transparent: true,

        opacity: 0.48,

        roughness: 0.12,

        metalness: 0.25,

        clearcoat: 1,

        clearcoatRoughness: 0.08,

        emissive: color,

        emissiveIntensity: 0.12
      });

    const crystal =
      new THREE.Mesh(
        geometry,
        material
      );

    crystal.position.set(

      (Math.random() - 0.5) * 18,

      (Math.random() - 0.5) * 11,

      -2 - Math.random() * 14

    );

    crystal.rotation.set(

      Math.random(),
      Math.random(),
      Math.random()

    );

    crystal.userData = {

      rx:
        (Math.random() - 0.5) * 0.006,

      ry:
        (Math.random() - 0.5) * 0.008,

      float:
        Math.random() * Math.PI * 2
    };

    scene.add(crystal);

    crystals.push(crystal);
  }

  /* =========================
     CENTRAL GLOW
  ========================= */

  const core =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        2.2,
        32,
        32
      ),

      new THREE.MeshBasicMaterial({

        color: 0x8b5cff,

        transparent: true,

        opacity: 0.075,

        blending:
          THREE.AdditiveBlending,

        depthWrite: false
      })
    );

  scene.add(core);

  /* =========================
     MOUSE PARALLAX
  ========================= */

  let mouseX = 0;
  let mouseY = 0;

  let targetX = 0;
  let targetY = 0;

  addEventListener(
    "pointermove",
    event => {

      targetX =
        (event.clientX / innerWidth - 0.5) * 2;

      targetY =
        (event.clientY / innerHeight - 0.5) * 2;

    },
    { passive: true }
  );

  /* =========================
     RESIZE
  ========================= */

  addEventListener(
    "resize",
    () => {

      camera.aspect =
        innerWidth / innerHeight;

      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        Math.min(devicePixelRatio, 2)
      );

      renderer.setSize(
        innerWidth,
        innerHeight
      );

    }
  );

  /* =========================
     ANIMATION
  ========================= */

  const clock =
    new THREE.Clock();

  function animate() {

    requestAnimationFrame(
      animate
    );

    const time =
      clock.getElapsedTime();

    mouseX +=
      (targetX - mouseX) * 0.025;

    mouseY +=
      (targetY - mouseY) * 0.025;

    camera.position.x +=
      (mouseX * 1.15 -
        camera.position.x) * 0.018;

    camera.position.y +=
      (-mouseY * 0.7 -
        camera.position.y) * 0.018;

    camera.lookAt(
      0,
      0,
      -3
    );

    stars.rotation.y =
      time * 0.012;

    stars.rotation.x =
      Math.sin(time * 0.08) * 0.035;

    rings.forEach(
      (ring, index) => {

        ring.rotation.z +=
          ring.userData.speed * 0.008;

        ring.rotation.x +=
          Math.sin(
            time * 0.12 + index
          ) * 0.00035;

        ring.rotation.y +=
          0.0012;
      }
    );

    crystals.forEach(
      crystal => {

        crystal.rotation.x +=
          crystal.userData.rx;

        crystal.rotation.y +=
          crystal.userData.ry;

        crystal.position.y +=
          Math.sin(
            time * 0.45 +
            crystal.userData.float
          ) * 0.0018;
      }
    );

    const pulse =
      1 +
      Math.sin(time * 1.2) * 0.06;

    core.scale.setScalar(
      pulse
    );

    renderer.render(
      scene,
      camera
    );
  }

  animate();

})();
