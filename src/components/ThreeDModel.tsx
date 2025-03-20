
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDModelProps {
  className?: string;
}

const ThreeDModel = ({ className }: ThreeDModelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // DNA double helix model
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);
    
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1, -3, 0),
      new THREE.Vector3(1, -2, 0),
      new THREE.Vector3(-1, -1, 0),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 1, 0),
      new THREE.Vector3(1, 2, 0),
      new THREE.Vector3(-1, 3, 0)
    ]);
    
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1, -3, 0),
      new THREE.Vector3(-1, -2, 0),
      new THREE.Vector3(1, -1, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(-1, 2, 0),
      new THREE.Vector3(1, 3, 0)
    ]);
    
    const tube1Geometry = new THREE.TubeGeometry(curve1, 64, 0.1, 8, false);
    const tube1Material = new THREE.MeshPhongMaterial({ 
      color: 0x0ca1eb,
      shininess: 100
    });
    const tube1 = new THREE.Mesh(tube1Geometry, tube1Material);
    dnaGroup.add(tube1);
    
    const tube2Geometry = new THREE.TubeGeometry(curve2, 64, 0.1, 8, false);
    const tube2Material = new THREE.MeshPhongMaterial({ 
      color: 0x0ca1eb,
      shininess: 100
    });
    const tube2 = new THREE.Mesh(tube2Geometry, tube2Material);
    dnaGroup.add(tube2);
    
    // Add connecting "rungs" between the two helices
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const point1 = curve1.getPointAt(t);
      const point2 = curve2.getPointAt(t);
      
      const connectionGeometry = new THREE.CylinderGeometry(0.05, 0.05, point1.distanceTo(point2), 8);
      const connectionMaterial = new THREE.MeshPhongMaterial({ 
        color: i % 2 === 0 ? 0xE94560 : 0x533483,
        shininess: 100
      });
      
      const connection = new THREE.Mesh(connectionGeometry, connectionMaterial);
      
      // Position at midpoint between the two curve points
      connection.position.copy(new THREE.Vector3().addVectors(point1, point2).multiplyScalar(0.5));
      
      // Rotate to connect the two points
      connection.lookAt(point2);
      connection.rotateX(Math.PI / 2);
      
      dnaGroup.add(connection);
    }
    
    // Position camera
    camera.position.z = 7;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      dnaGroup.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} className={`w-full h-full ${className || ''}`}></div>;
};

export default ThreeDModel;
