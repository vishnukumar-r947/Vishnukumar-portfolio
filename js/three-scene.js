/**
 * 3D Interactive Background for Vishnukumar R Portfolio
 * ----------------------------------------------------
 * Creates a futuristic 3D ambient scene using Three.js with:
 * - Floating geometric objects (Icosahedron, Torus, Octahedron, Dodecahedron)
 * - Luminous particle constellation
 * - Subtle 3D cyber grid
 * - Smooth cursor parallax & scroll reactivity
 * - Seamless Light / Dark theme illumination transitions
 */

class Portfolio3DScene {
  constructor() {
    this.container = document.getElementById("bg-canvas-container");
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.shapes = [];
    this.particles = null;
    this.grid = null;
    this.ambientLight = null;
    this.directionalLight = null;
    this.pointLight = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollY = 0;
    this.targetScrollY = 0;

    this.isDark = document.documentElement.getAttribute("data-theme") === "dark";
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
  }

  init() {
    // Check if Three.js is available
    if (typeof THREE === "undefined") {
      this.initCanvasFallback();
      return;
    }

    try {
      this.setupScene();
      this.setupLights();
      this.createShapes();
      this.createParticles();
      this.createGrid();
      this.setupEventListeners();
      this.animate();
    } catch (e) {
      console.warn("Three.js initialization failed, falling back to 2D canvas:", e);
      this.initCanvasFallback();
    }
  }

  setupScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.container.appendChild(this.renderer.domElement);
  }

  setupLights() {
    this.ambientLight = new THREE.AmbientLight(
      this.isDark ? 0x243b55 : 0xf1f5f9,
      this.isDark ? 1.4 : 1.8
    );
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(
      this.isDark ? 0x00d2ff : 0x0284c7,
      this.isDark ? 2.0 : 1.6
    );
    this.directionalLight.position.set(20, 25, 20);
    this.scene.add(this.directionalLight);

    this.pointLight = new THREE.PointLight(
      this.isDark ? 0x9333ea : 0x7c3aed,
      this.isDark ? 3.0 : 2.0,
      60
    );
    this.pointLight.position.set(-15, -10, 15);
    this.scene.add(this.pointLight);
  }

  createShapes() {
    const isDark = this.isDark;

    // Materials with glass / metallic luster
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0f2b48 : 0xe0f2fe,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.4,
      transparent: true,
      opacity: isDark ? 0.65 : 0.55,
      wireframe: false
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00d2ff : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22
    });

    const violetWireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xa855f7 : 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.32 : 0.2
    });

    // 1. Hero floating geometric core - Icosahedron
    const icosaGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const icosaMesh = new THREE.Mesh(icosaGeo, glassMat.clone());
    const icosaWire = new THREE.Mesh(icosaGeo, wireMat.clone());
    const icosaGroup = new THREE.Group();
    icosaGroup.add(icosaMesh);
    icosaGroup.add(icosaWire);
    icosaGroup.position.set(16, 6, -5);
    this.scene.add(icosaGroup);
    this.shapes.push({
      obj: icosaGroup,
      rotX: 0.003,
      rotY: 0.005,
      rotZ: 0.002,
      baseX: 16,
      baseY: 6,
      floatSpeed: 0.0015,
      floatAmp: 0.8
    });

    // 2. Floating Torus (Left side accent)
    const torusGeo = new THREE.TorusGeometry(3.5, 0.9, 16, 50);
    const torusMesh = new THREE.Mesh(torusGeo, glassMat.clone());
    const torusWire = new THREE.Mesh(torusGeo, violetWireMat.clone());
    const torusGroup = new THREE.Group();
    torusGroup.add(torusMesh);
    torusGroup.add(torusWire);
    torusGroup.position.set(-18, -2, -10);
    this.scene.add(torusGroup);
    this.shapes.push({
      obj: torusGroup,
      rotX: 0.004,
      rotY: 0.003,
      rotZ: 0.005,
      baseX: -18,
      baseY: -2,
      floatSpeed: 0.0012,
      floatAmp: 1.1
    });

    // 3. Floating Octahedron (Mid Depth)
    const octaGeo = new THREE.OctahedronGeometry(2.8, 0);
    const octaMesh = new THREE.Mesh(octaGeo, glassMat.clone());
    const octaWire = new THREE.Mesh(octaGeo, wireMat.clone());
    const octaGroup = new THREE.Group();
    octaGroup.add(octaMesh);
    octaGroup.add(octaWire);
    octaGroup.position.set(14, -14, -8);
    this.scene.add(octaGroup);
    this.shapes.push({
      obj: octaGroup,
      rotX: 0.005,
      rotY: 0.004,
      rotZ: 0.003,
      baseX: 14,
      baseY: -14,
      floatSpeed: 0.0018,
      floatAmp: 0.9
    });

    // 4. Floating Dodecahedron (Bottom-Left Depth)
    const dodecaGeo = new THREE.DodecahedronGeometry(2.5, 0);
    const dodecaMesh = new THREE.Mesh(dodecaGeo, glassMat.clone());
    const dodecaWire = new THREE.Mesh(dodecaGeo, violetWireMat.clone());
    const dodecaGroup = new THREE.Group();
    dodecaGroup.add(dodecaMesh);
    dodecaGroup.add(dodecaWire);
    dodecaGroup.position.set(-14, -22, -6);
    this.scene.add(dodecaGroup);
    this.shapes.push({
      obj: dodecaGroup,
      rotX: 0.003,
      rotY: 0.006,
      rotZ: 0.002,
      baseX: -14,
      baseY: -22,
      floatSpeed: 0.0014,
      floatAmp: 0.7
    });
  }

  createParticles() {
    const count = window.innerWidth < 768 ? 100 : 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 75;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 45;
      scales[i] = Math.random() * 2 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: this.isDark ? 0x38bdf8 : 0x0284c7,
      size: 0.35,
      transparent: true,
      opacity: this.isDark ? 0.6 : 0.45,
      blending: THREE.NormalBlending
    });

    this.particles = new THREE.Points(geometry, particleMat);
    this.scene.add(this.particles);
  }

  createGrid() {
    const size = 120;
    const divisions = 40;
    const gridColor = this.isDark ? 0x1e293b : 0xe2e8f0;
    const gridCenterColor = this.isDark ? 0x0284c7 : 0x93c5fd;

    this.grid = new THREE.GridHelper(size, divisions, gridCenterColor, gridColor);
    this.grid.position.y = -26;
    this.grid.position.z = -15;
    this.grid.rotation.x = 0.25;
    this.grid.material.opacity = this.isDark ? 0.25 : 0.2;
    this.grid.material.transparent = true;
    this.scene.add(this.grid);
  }

  setupEventListeners() {
    window.addEventListener("resize", () => this.onResize(), { passive: true });

    window.addEventListener(
      "mousemove",
      (e) => {
        this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );

    window.addEventListener(
      "scroll",
      () => {
        this.targetScrollY = window.scrollY || window.pageYOffset;
      },
      { passive: true }
    );

    // Watch theme change from HTML attribute
    const observer = new MutationObserver(() => {
      this.updateTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
  }

  updateTheme() {
    this.isDark = document.documentElement.getAttribute("data-theme") === "dark";

    if (this.ambientLight) {
      this.ambientLight.color.setHex(this.isDark ? 0x243b55 : 0xf1f5f9);
      this.ambientLight.intensity = this.isDark ? 1.4 : 1.8;
    }
    if (this.directionalLight) {
      this.directionalLight.color.setHex(this.isDark ? 0x00d2ff : 0x0284c7);
      this.directionalLight.intensity = this.isDark ? 2.0 : 1.6;
    }
    if (this.pointLight) {
      this.pointLight.color.setHex(this.isDark ? 0x9333ea : 0x7c3aed);
      this.pointLight.intensity = this.isDark ? 3.0 : 2.0;
    }
    if (this.particles) {
      this.particles.material.color.setHex(this.isDark ? 0x38bdf8 : 0x0284c7);
      this.particles.material.opacity = this.isDark ? 0.6 : 0.45;
    }
    if (this.grid) {
      this.grid.material.opacity = this.isDark ? 0.25 : 0.2;
    }
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.reducedMotion) {
      this.renderer.render(this.scene, this.camera);
      return;
    }

    // Smooth Damping for mouse & scroll
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.04;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.04;
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.05;

    const time = Date.now();

    // Rotate and float shapes
    this.shapes.forEach((item, index) => {
      item.obj.rotation.x += item.rotX;
      item.obj.rotation.y += item.rotY;
      item.obj.rotation.z += item.rotZ;

      // Floating sine oscillation
      const floatOffset = Math.sin(time * item.floatSpeed + index) * item.floatAmp;
      item.obj.position.y = item.baseY + floatOffset;

      // React subtly to mouse
      item.obj.position.x = item.baseX + this.mouseX * (1.5 + index * 0.5);
    });

    // Particle drift
    if (this.particles) {
      this.particles.rotation.y = time * 0.0001 + this.mouseX * 0.1;
      this.particles.rotation.x = time * 0.00005 + this.mouseY * 0.08;
    }

    // Camera parallax with scroll and mouse
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const scrollProgress = this.scrollY / maxScroll;

    this.camera.position.x = this.mouseX * 3;
    this.camera.position.y = -this.mouseY * 2 - scrollProgress * 15;
    this.camera.lookAt(0, -scrollProgress * 15, 0);

    this.renderer.render(this.scene, this.camera);
  }

  initCanvasFallback() {
    const canvas = document.createElement("canvas");
    this.container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Lightweight 2D canvas floating orbs
    const orbs = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 80 + 30,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      hue: Math.random() > 0.5 ? 195 : 260
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -100) orb.x = canvas.width + 100;
        if (orb.x > canvas.width + 100) orb.x = -100;
        if (orb.y < -100) orb.y = canvas.height + 100;
        if (orb.y > canvas.height + 100) orb.y = -100;

        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        const alpha = isDark ? 0.08 : 0.05;
        grad.addColorStop(0, `hsla(${orb.hue}, 90%, 60%, ${alpha})`);
        grad.addColorStop(1, `hsla(${orb.hue}, 90%, 60%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    };
    render();
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.portfolio3D = new Portfolio3DScene();
});
