"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function RobotAvatar() {
  // Refs for THREE.js objects
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const robotRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State variables
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [robotColor, setRobotColor] = useState<number>(0x3b82f6); // Initial blue color
  const [robotMood, setRobotMood] = useState<string>("happy"); // Initial mood
  const [robotAction, setRobotAction] = useState<string>("idle"); // State for actions
  const [isRainbow, setIsRainbow] = useState<boolean>(false); // For rainbow mode
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    "Hello! Welcome to my portfolio! 👋"
  );
  const [wearingMustache, setWearingMustache] = useState<boolean>(false);
  const [wearingSunglasses, setWearingSunglasses] = useState<boolean>(false);

  // Key for remounting component when navigating
  const [mountKey, setMountKey] = useState<number>(Date.now());

  // Effect to reset the component when navigating back
  useEffect(() => {
    // This will force remount when navigating back to this page
    const handleRouteChange = () => {
      setMountKey(Date.now());
    };

    // Listen for visibility change to handle tab switching
    document.addEventListener("visibilitychange", handleRouteChange);

    return () => {
      document.removeEventListener("visibilitychange", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(120, 120); // Smaller size
    rendererRef.current = renderer;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // Light background
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create robot
    const robot = new THREE.Group();
    robotRef.current = robot;

    // Head
    const headGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8, 4, 4, 4);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: robotColor, // Using state for color
      shininess: 100,
      specular: 0xffffff,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    robot.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
    });

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.5, 0.4, 0.9);
    robot.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 0.4, 0.9);
    robot.add(rightEye);

    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      shininess: 100,
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 1.2, 0);
    robot.add(antenna);

    // Antenna tip
    const ballGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.8,
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 1.5, 0);
    robot.add(ball);

    // Mouth
    const mouthGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.1);
    const mouthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.4, 0.9);
    robot.add(mouth);

    // Mustache (initially invisible)
    const mustacheGroup = new THREE.Group();

    // Left part
    const leftMustacheGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.05);
    const mustacheMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      shininess: 90,
    });
    const leftMustachePart = new THREE.Mesh(
      leftMustacheGeometry,
      mustacheMaterial
    );
    leftMustachePart.position.set(-0.3, -0.2, 0.95);
    leftMustachePart.rotation.z = Math.PI / 12; // Slight angle
    mustacheGroup.add(leftMustachePart);

    // Right part
    const rightMustacheGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.05);
    const rightMustachePart = new THREE.Mesh(
      rightMustacheGeometry,
      mustacheMaterial
    );
    rightMustachePart.position.set(0.3, -0.2, 0.95);
    rightMustachePart.rotation.z = -Math.PI / 12; // Slight angle in opposite direction
    mustacheGroup.add(rightMustachePart);

    // Center part
    const centerMustacheGeometry = new THREE.BoxGeometry(0.2, 0.08, 0.05);
    const centerMustachePart = new THREE.Mesh(
      centerMustacheGeometry,
      mustacheMaterial
    );
    centerMustachePart.position.set(0, -0.2, 0.96);
    mustacheGroup.add(centerMustachePart);

    mustacheGroup.visible = wearingMustache;
    robot.add(mustacheGroup);

    // Sunglasses (initially invisible)
    const sunglassesGroup = new THREE.Group();

    // Frame
    const frameGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.05);
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      shininess: 90,
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0.4, 0.95);
    sunglassesGroup.add(frame);

    // Middle bridge
    const bridgeGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.12);
    const bridgeMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      shininess: 90,
    });
    const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
    bridge.position.set(0, 0.4, 1);
    sunglassesGroup.add(bridge);

    // Left lens
    const lensGeometry = new THREE.CircleGeometry(0.35, 32);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
    leftLens.position.set(-0.55, 0.4, 0.96);
    leftLens.rotation.x = Math.PI / 2;
    sunglassesGroup.add(leftLens);

    // Right lens
    const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
    rightLens.position.set(0.55, 0.4, 0.96);
    rightLens.rotation.x = Math.PI / 2;
    sunglassesGroup.add(rightLens);

    sunglassesGroup.visible = wearingSunglasses;
    robot.add(sunglassesGroup);

    scene.add(robot);

    // Add to DOM
    containerRef.current.appendChild(renderer.domElement);

    // Animation
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (
        robotRef.current &&
        sceneRef.current &&
        cameraRef.current &&
        rendererRef.current
      ) {
        const robot = robotRef.current;

        // Rainbow mode color cycling
        if (isRainbow) {
          const hue = (Date.now() * 0.001) % 1;
          const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
          if (head.material instanceof THREE.MeshPhongMaterial) {
            head.material.color.set(color);
          }
          if (ball.material instanceof THREE.MeshPhongMaterial) {
            ball.material.color.set(color);
            ball.material.emissive.set(color);
          }
          if (antenna.material instanceof THREE.MeshPhongMaterial) {
            antenna.material.color.set(color);
          }
        } else {
          // Normal color
          const normalColor = new THREE.Color(robotColor);
          if (head.material instanceof THREE.MeshPhongMaterial) {
            head.material.color.set(normalColor);
          }
          if (ball.material instanceof THREE.MeshPhongMaterial) {
            ball.material.color.set(normalColor);
            ball.material.emissive.set(normalColor);
          }
          if (antenna.material instanceof THREE.MeshPhongMaterial) {
            antenna.material.color.set(normalColor);
          }
        }

        // Update accessory visibility
        mustacheGroup.visible = wearingMustache;
        sunglassesGroup.visible = wearingSunglasses;

        // Basic animation based on mood
        let floatSpeed = 0.001;
        let floatAmount = 0.1;
        let rotationSpeed = 0.0005;
        let rotationAmount = 0.2;

        // Apply mood modifications
        if (robotMood === "excited") {
          floatSpeed = 0.002;
          rotationSpeed = 0.001;
          rotationAmount = 0.3;
        } else if (robotMood === "sad") {
          floatAmount = 0.05;
        }

        // Special actions
        if (robotAction === "idle") {
          // Default floating animation
          robot.position.y = Math.sin(Date.now() * floatSpeed) * floatAmount;
          robot.rotation.y =
            Math.sin(Date.now() * rotationSpeed) * rotationAmount;
        } else if (robotAction === "dance") {
          // Dancing animation
          const time = Date.now() * 0.003;
          robot.position.y = Math.sin(time * 2) * 0.2;
          robot.rotation.y += 0.05;
          robot.rotation.z = Math.sin(time * 3) * 0.2;
          robot.scale.y = 1 + Math.sin(time * 4) * 0.1;
        } else if (robotAction === "spin") {
          // Fast spinning
          robot.rotation.y += 0.1;
        } else if (robotAction === "jump") {
          // Jump animation
          const jumpTime = Date.now() * 0.002;
          const jumpCurve = Math.sin(jumpTime * 2);
          robot.position.y = Math.max(0, jumpCurve) * 0.5;

          // Add a little squash when landing
          if (jumpCurve <= 0) {
            robot.scale.y = 1 + jumpCurve * 0.2;
            robot.scale.x = 1 - jumpCurve * 0.1;
            robot.scale.z = 1 - jumpCurve * 0.1;
          } else {
            robot.scale.setScalar(1);
          }
        } else if (robotAction === "dizzy") {
          // Dizzy animation
          const dizzyTime = Date.now() * 0.002;
          robot.rotation.z = Math.sin(dizzyTime * 5) * 0.3;
          robot.rotation.x = Math.sin(dizzyTime * 4) * 0.2;
          robot.rotation.y += 0.03;

          // Make eyes swirl
          const eyeScale = 0.8 + Math.sin(dizzyTime * 8) * 0.2;
          leftEye.scale.set(eyeScale, eyeScale, 1);
          rightEye.scale.set(eyeScale, eyeScale, 1);
        }

        // Eye animations
        // Random blinking
        const eyes = [leftEye, rightEye];
        eyes.forEach((eye) => {
          // More frequent blinking when excited
          const blinkChance = robotMood === "excited" ? 0.01 : 0.005;
          if (Math.random() < blinkChance && robotAction !== "dizzy") {
            eye.scale.y = 0.1;
            setTimeout(() => {
              eye.scale.y = 1;
            }, 150);
          }
        });

        // Mouth adjustments based on mood
        if (robotMood === "sad") {
          mouth.position.y = -0.5; // Lower position for sad
          mouth.rotation.z = Math.PI; // Flip for frown
        } else {
          mouth.position.y = -0.4; // Normal position
          mouth.rotation.z = 0; // Normal rotation for smile
        }

        // Random mouth movement when speaking
        if (showWelcome && Math.random() < 0.1) {
          const mouthMovement = robotMood === "excited" ? 2 : 1.5;
          mouth.scale.y = 0.5 + Math.random() * mouthMovement;
          setTimeout(() => {
            mouth.scale.y = 1;
          }, 100);
        }

        // Render the scene
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Initial resize call
    handleResize();

    // Reset action after timeout
    if (actionTimeoutRef.current) {
      clearTimeout(actionTimeoutRef.current);
    }

    if (robotAction !== "idle") {
      actionTimeoutRef.current = setTimeout(() => {
        setRobotAction("idle");
      }, 4000); // Actions run for 4 seconds
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (
        containerRef.current &&
        rendererRef.current &&
        rendererRef.current.domElement
      ) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.log("Element already removed", e);
        }
      }
      if (actionTimeoutRef.current) {
        clearTimeout(actionTimeoutRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [
    mountKey, // Add this to force remount
    showWelcome,
    robotColor,
    robotMood,
    robotAction,
    isRainbow,
    wearingMustache,
    wearingSunglasses,
  ]);

  // Function to trigger an action with custom message
  const triggerAction = (action: string, message: string): void => {
    setRobotAction(action);
    setWelcomeMessage(message);
    setShowWelcome(true);

    // Reset action after timeout
    if (actionTimeoutRef.current) {
      clearTimeout(actionTimeoutRef.current);
    }

    actionTimeoutRef.current = setTimeout(() => {
      setRobotAction("idle");
    }, 4000); // Actions run for 4 seconds
  };

  // Toggle rainbow mode
  const toggleRainbow = (): void => {
    const newRainbowState = !isRainbow;
    setIsRainbow(newRainbowState);

    setWelcomeMessage(
      newRainbowState
        ? "🌈 Rainbow mode activated! I'm fabulous! 🌈"
        : "Back to normal colors!"
    );
    setShowWelcome(true);
  };

  // Toggle accessories
  const toggleMustache = (): void => {
    const newState = !wearingMustache;
    setWearingMustache(newState);
    setWelcomeMessage(
      newState
        ? "How do you like my mustache? Very distinguished, no?"
        : "Removing my fancy mustache!"
    );
    setShowWelcome(true);
  };

  const toggleSunglasses = (): void => {
    const newState = !wearingSunglasses;
    setWearingSunglasses(newState);
    setWelcomeMessage(
      newState
        ? "These sunglasses make me look like a movie star, right?"
        : "Taking off my cool shades!"
    );
    setShowWelcome(true);
  };

  // Function to handle closing the robot
  const handleCloseRobot = (): void => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="absolute top-28 left-4 z-50" key={mountKey.toString()}>
      <div className="relative">
        {/* Robot container */}
        <div
          className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-lg border-2 border-blue-500 overflow-hidden cursor-pointer"
          onClick={() => setShowWelcome(!showWelcome)}
          ref={containerRef}
        />

        {/* Menu toggle button - outside the robot container */}
        <button
          className="absolute -bottom-6 -right-1 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white shadow-md z-10 hover:bg-slate-600 transition-all duration-200 transform"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          aria-label="Toggle robot controls"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>

        {/* Welcome message */}
        {showWelcome && (
          <div className="absolute left-20 top-0 bg-white dark:bg-slate-700 rounded-lg shadow-lg p-3 w-56 border border-slate-200 dark:border-slate-600">
            <p className="text-sm text-slate-800 dark:text-slate-200">
              {welcomeMessage}
            </p>
            <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white dark:border-r-slate-700"></div>
          </div>
        )}

        {/* Dropdown menu for all controls - positioned below robot */}
        {showMenu && (
          <div className="absolute top-full left-0 mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-3 w-64 z-50">
            {/* Section title */}
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Mood
            </div>

            {/* Mood buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => {
                  setRobotMood("happy");
                  setWelcomeMessage("Hello! Welcome to my portfolio! 👋");
                  setShowWelcome(true);
                }}
                className={`p-1 text-sm rounded-md flex-1 transition-all duration-200 ${
                  robotMood === "happy"
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
                aria-label="Set robot mood to happy"
              >
                😊 Happy
              </button>
              <button
                onClick={() => {
                  setRobotMood("excited");
                  setWelcomeMessage(
                    "WOW! SO EXCITED you're here at my portfolio! 🎉"
                  );
                  setShowWelcome(true);
                }}
                className={`p-1 text-sm rounded-md flex-1 transition-all duration-200 ${
                  robotMood === "excited"
                    ? "bg-yellow-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
                aria-label="Set robot mood to excited"
              >
                🎉 Excited
              </button>
              <button
                onClick={() => {
                  setRobotMood("sad");
                  setWelcomeMessage(
                    "Oh... hi there. This is my portfolio... 😔"
                  );
                  setShowWelcome(true);
                }}
                className={`p-1 text-sm rounded-md flex-1 transition-all duration-200 ${
                  robotMood === "sad"
                    ? "bg-gray-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
                aria-label="Set robot mood to sad"
              >
                😔 Sad
              </button>
            </div>

            {/* Section title */}
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Color
            </div>

            {/* Color buttons */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              <button
                onClick={() => {
                  setRobotColor(0x3b82f6); // Blue
                  setWelcomeMessage("Blue is my favorite color!");
                  setShowWelcome(true);
                }}
                className="w-8 h-8 bg-blue-500 rounded-md shadow-sm hover:scale-105 transition-transform duration-200"
                aria-label="Set robot color to blue"
              />
              <button
                onClick={() => {
                  setRobotColor(0x10b981); // Green
                  setWelcomeMessage("Green makes me feel refreshed!");
                  setShowWelcome(true);
                }}
                className="w-8 h-8 bg-green-500 rounded-md shadow-sm hover:scale-105 transition-transform duration-200"
                aria-label="Set robot color to green"
              />
              <button
                onClick={() => {
                  setRobotColor(0xef4444); // Red
                  setWelcomeMessage("Red hot and ready to go!");
                  setShowWelcome(true);
                }}
                className="w-8 h-8 bg-red-500 rounded-md shadow-sm hover:scale-105 transition-transform duration-200"
                aria-label="Set robot color to red"
              />
              <button
                onClick={() => {
                  setRobotColor(0xa855f7); // Purple
                  setWelcomeMessage("Purple royalty at your service!");
                  setShowWelcome(true);
                }}
                className="w-8 h-8 bg-purple-500 rounded-md shadow-sm hover:scale-105 transition-transform duration-200"
                aria-label="Set robot color to purple"
              />
              <button
                onClick={toggleRainbow}
                className={`w-8 h-8 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-md shadow-sm hover:scale-105 transition-transform duration-200 ${
                  isRainbow ? "ring-2 ring-yellow-400" : ""
                }`}
                aria-label="Toggle rainbow mode"
              />
            </div>

            {/* Section title */}
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Actions
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() =>
                  triggerAction("dance", "Look at my sweet dance moves! 💃")
                }
                className="p-1 text-sm bg-cyan-500 text-white rounded-md shadow-sm hover:bg-cyan-600 hover:scale-105 transition-all duration-200"
                aria-label="Make robot dance"
              >
                💃 Dance
              </button>
              <button
                onClick={() =>
                  triggerAction("spin", "Wheeeeee! I'm spinning! 🌀")
                }
                className="p-1 text-sm bg-amber-500 text-white rounded-md shadow-sm hover:bg-amber-600 hover:scale-105 transition-all duration-200"
                aria-label="Make robot spin"
              >
                🌀 Spin
              </button>
              <button
                onClick={() =>
                  triggerAction("jump", "Boing! Boing! Watch me jump! 🦘")
                }
                className="p-1 text-sm bg-lime-500 text-white rounded-md shadow-sm hover:bg-lime-600 hover:scale-105 transition-all duration-200"
                aria-label="Make robot jump"
              >
                🦘 Jump
              </button>
              <button
                onClick={() =>
                  triggerAction("dizzy", "Whoa... I'm feeling dizzy... 😵‍💫")
                }
                className="p-1 text-sm bg-pink-500 text-white rounded-md shadow-sm hover:bg-pink-600 hover:scale-105 transition-all duration-200"
                aria-label="Make robot dizzy"
              >
                😵‍💫 Dizzy
              </button>
            </div>

            {/* Section title */}
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              Accessories
            </div>

            {/* Accessories buttons */}
            <div className="flex gap-2">
              <button
                onClick={toggleMustache}
                className={`p-1 text-sm flex-1 rounded-md shadow-sm transition-all duration-200 ${
                  wearingMustache
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
                aria-label="Toggle mustache"
              >
                👨 Mustache
              </button>
              <button
                onClick={toggleSunglasses}
                className={`p-1 text-sm flex-1 rounded-md shadow-sm transition-all duration-200 ${
                  wearingSunglasses
                    ? "bg-teal-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
                aria-label="Toggle sunglasses"
              >
                😎 Sunglasses
              </button>
            </div>

            {/* Close button */}
            <div className="mt-4 text-center">
              <button
                className="px-2 py-1 text-xs bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition-all duration-200"
                onClick={handleCloseRobot}
                aria-label="Close robot avatar"
              >
                Close Robot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
