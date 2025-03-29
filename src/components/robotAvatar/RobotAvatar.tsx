"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ROBOT_ACTIONS,
  ROBOT_COLORS,
  ROBOT_ACCESSORIES,
  ROBOT_FAQ,
  ROBOT_INTERACTIONS,
  getRandomWelcomeMessage,
  getTimeBasedGreeting,
} from "./robotCommands";
import { RobotInteraction } from "./robotCommands";

export default function RobotAvatar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const robotRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const actionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showFAQ, setShowFAQ] = useState<boolean>(false);
  const [robotColor, setRobotColor] = useState<number>(0x3b82f6);
  const [robotAction, setRobotAction] = useState<string>("idle");
  const [isRainbow, setIsRainbow] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>(
    getRandomWelcomeMessage()
  );
  const [wearingMustache, setWearingMustache] = useState<boolean>(false);
  const [wearingSunglasses, setWearingSunglasses] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [mountKey, setMountKey] = useState<number>(Date.now());

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setMountKey(Date.now());
        setWelcomeMessage("Welcome back! Glad you returned to the portfolio!");
        setShowWelcome(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setMountKey(Date.now());
    }
  }, [visible]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWelcomeMessage(getTimeBasedGreeting());
      setShowWelcome(true);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const setupInteractions = () => {
      ROBOT_INTERACTIONS.forEach((interaction: RobotInteraction) => {
        const elements = document.querySelectorAll(interaction.selector);

        elements.forEach((element) => {
          element.addEventListener("mouseenter", () => {
            setWelcomeMessage(interaction.message);
            setShowWelcome(true);

            if (interaction.action) {
              setRobotAction(interaction.action);

              if (actionTimeoutRef.current) {
                clearTimeout(actionTimeoutRef.current);
              }

              actionTimeoutRef.current = setTimeout(() => {
                setRobotAction("idle");
              }, 4000);
            }
          });
        });
      });
    };

    const timeoutId = setTimeout(setupInteractions, 1000);

    return () => {
      clearTimeout(timeoutId);

      ROBOT_INTERACTIONS.forEach((interaction: RobotInteraction) => {
        const elements = document.querySelectorAll(interaction.selector);
        elements.forEach((element) => {
          element.removeEventListener("mouseenter", () => {});
        });
      });
    };
  }, [visible]);

  useEffect(() => {
    if (!containerRef.current || !visible) return;

    if (
      rendererRef.current &&
      rendererRef.current.domElement &&
      containerRef.current.contains(rendererRef.current.domElement)
    ) {
      containerRef.current.removeChild(rendererRef.current.domElement);
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(120, 120); // Smaller size
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const robot = new THREE.Group();
    robotRef.current = robot;

    const headGeometry = new THREE.BoxGeometry(1.8, 1.8, 1.8, 4, 4, 4);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: robotColor,
      shininess: 100,
      specular: 0xffffff,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    robot.add(head);

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

    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({
      color: robotColor,
      shininess: 100,
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 1.2, 0);
    robot.add(antenna);

    const ballGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const ballMaterial = new THREE.MeshPhongMaterial({
      color: robotColor,
      emissive: robotColor,
      emissiveIntensity: 0.8,
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 1.5, 0);
    robot.add(ball);

    const mouthGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.1);
    const mouthMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
    });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.4, 0.9);
    robot.add(mouth);

    const mustacheGroup = new THREE.Group();

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

    const rightMustacheGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.05);
    const rightMustachePart = new THREE.Mesh(
      rightMustacheGeometry,
      mustacheMaterial
    );
    rightMustachePart.position.set(0.3, -0.2, 0.95);
    rightMustachePart.rotation.z = -Math.PI / 12; // Slight angle in opposite direction
    mustacheGroup.add(rightMustachePart);

    const centerMustacheGeometry = new THREE.BoxGeometry(0.2, 0.08, 0.05);
    const centerMustachePart = new THREE.Mesh(
      centerMustacheGeometry,
      mustacheMaterial
    );
    centerMustachePart.position.set(0, -0.2, 0.96);
    mustacheGroup.add(centerMustachePart);

    mustacheGroup.visible = wearingMustache;
    robot.add(mustacheGroup);

    const sunglassesGroup = new THREE.Group();

    const frameGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.05);
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      shininess: 90,
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0.4, 0.95);
    sunglassesGroup.add(frame);

    const bridgeGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.12);
    const bridgeMaterial = new THREE.MeshPhongMaterial({
      color: 0x222222,
      shininess: 90,
    });
    const bridge = new THREE.Mesh(bridgeGeometry, bridgeMaterial);
    bridge.position.set(0, 0.4, 1);
    sunglassesGroup.add(bridge);

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

    const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
    rightLens.position.set(0.55, 0.4, 0.96);
    rightLens.rotation.x = Math.PI / 2;
    sunglassesGroup.add(rightLens);

    sunglassesGroup.visible = wearingSunglasses;
    robot.add(sunglassesGroup);
    scene.add(robot);

    containerRef.current.appendChild(renderer.domElement);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      if (
        robotRef.current &&
        sceneRef.current &&
        cameraRef.current &&
        rendererRef.current
      ) {
        const robot = robotRef.current;

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

        mustacheGroup.visible = wearingMustache;
        sunglassesGroup.visible = wearingSunglasses;

        // Basic animation parameters
        const floatSpeed = 0.001;
        const floatAmount = 0.1;
        const rotationSpeed = 0.0005;
        const rotationAmount = 0.2;

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
          const dizzyTime = Date.now() * 0.002;
          robot.rotation.z = Math.sin(dizzyTime * 5) * 0.3;
          robot.rotation.x = Math.sin(dizzyTime * 4) * 0.2;
          robot.rotation.y += 0.03;

          const eyeScale = 0.8 + Math.sin(dizzyTime * 8) * 0.2;
          leftEye.scale.set(eyeScale, eyeScale, 1);
          rightEye.scale.set(eyeScale, eyeScale, 1);
        }

        // Eye animations
        // Random blinking
        const eyes = [leftEye, rightEye];
        eyes.forEach((eye) => {
          const blinkChance = 0.005;
          if (Math.random() < blinkChance && robotAction !== "dizzy") {
            eye.scale.y = 0.1;
            setTimeout(() => {
              eye.scale.y = 1;
            }, 150);
          }
        });

        if (showWelcome && Math.random() < 0.1) {
          const mouthMovement = 1.5;
          mouth.scale.y = 0.5 + Math.random() * mouthMovement;
          setTimeout(() => {
            mouth.scale.y = 1;
          }, 100);
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

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

    handleResize();

    if (actionTimeoutRef.current) {
      clearTimeout(actionTimeoutRef.current);
    }

    if (robotAction !== "idle") {
      actionTimeoutRef.current = setTimeout(() => {
        setRobotAction("idle");
      }, 4000);
    }

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
    mountKey,
    showWelcome,
    robotColor,
    robotAction,
    isRainbow,
    wearingMustache,
    wearingSunglasses,
    visible,
  ]);

  // Function to trigger an action with custom message
  const triggerAction = (action: string, message: string): void => {
    setRobotAction(action);
    setWelcomeMessage(message);
    setShowWelcome(true);

    if (actionTimeoutRef.current) {
      clearTimeout(actionTimeoutRef.current);
    }

    actionTimeoutRef.current = setTimeout(() => {
      setRobotAction("idle");
    }, 4000);
  };

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

  const toggleAccessory = (
    accessoryId: string,
    currentState: boolean,
    setStateFn: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    const accessory = ROBOT_ACCESSORIES.find((a) => a.id === accessoryId);
    if (!accessory) return;

    const newState = !currentState;
    setStateFn(newState);
    setWelcomeMessage(
      newState ? accessory.equippedMessage : accessory.unequippedMessage
    );
    setShowWelcome(true);
  };

  const showFAQAnswer = (faqId: string): void => {
    const faq = ROBOT_FAQ.find((f) => f.id === faqId);
    if (!faq) return;

    setWelcomeMessage(faq.answer);
    setShowWelcome(true);
    setShowFAQ(false);
  };

  const handleToggleRobot = (): void => {
    setVisible(!visible);

    if (!visible) {
      setWelcomeMessage(
        "I'm back and ready to help! What would you like to know?"
      );
      setShowWelcome(true);
    }
  };

  if (!visible) {
    return (
      <div
        className={`${
          isMobile
            ? "fixed bottom-4 left-4 z-50" // Mobile: bottom left corner
            : "fixed top-28 left-4 z-50" // Desktop/tablet: fixed at top left
        }`}
      >
        <button
          onClick={handleToggleRobot}
          className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800 transition-all duration-200 text-white"
          aria-label="Show robot assistant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${
        isMobile ? "fixed bottom-4 left-4 z-50" : "fixed top-28 left-4 z-50"
      }`}
      key={mountKey.toString()}
    >
      <div className="relative">
        <div
          className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-lg border-2 border-blue-500 overflow-hidden cursor-pointer"
          onClick={() => setShowWelcome(!showWelcome)}
          onTouchStart={(e) => e.preventDefault()}
          onTouchEnd={(e) => {
            e.preventDefault();
            setShowWelcome(!showWelcome);
          }}
          ref={containerRef}
        />

        <button
          className={`absolute ${
            isMobile ? "top-0 -right-5" : "-bottom-6 -right-1"
          } w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white shadow-md z-10 hover:bg-slate-600 transition-all duration-200 transform`}
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
            setShowFAQ(false);
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

        {showWelcome && (
          <div
            className={`absolute ${
              isMobile
                ? "-top-4 -translate-y-full left-0 w-56 max-w-[calc(100vw-72px)]"
                : "left-20 top-0 w-64"
            } bg-white dark:bg-slate-700 rounded-lg shadow-lg p-3 border border-slate-200 dark:border-slate-600 z-20`}
          >
            <p className="text-sm text-slate-800 dark:text-slate-200 break-words">
              {welcomeMessage}
            </p>
            <div
              className={`absolute ${
                isMobile
                  ? "bottom-0 left-8 translate-y-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-slate-700"
                  : "-left-2 top-4 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white dark:border-r-slate-700"
              }`}
            ></div>
          </div>
        )}

        {showMenu && (
          <div
            className={`absolute ${
              isMobile ? "bottom-50 left-0 mb-0" : "top-full left-0 mt-8"
            } bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-3 w-64 max-w-[calc(100vw-80px)] z-50`}
          >
            <button
              onClick={() => {
                setShowFAQ(!showFAQ);
              }}
              className="w-full p-2 mb-4 text-sm bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition-all duration-200"
              aria-label="Toggle FAQ"
            >
              {showFAQ ? "Hide FAQ" : "Ask me about Bart"}
            </button>

            {showFAQ && (
              <div className="mb-4">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Frequently Asked Questions
                </div>
                <div className="flex flex-col gap-2">
                  {ROBOT_FAQ.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => showFAQAnswer(faq.id)}
                      className="p-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-200"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!showFAQ && (
              <>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Color
                </div>

                <div className="grid grid-cols-5 gap-2 mb-4">
                  {ROBOT_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => {
                        setRobotColor(color.hexValue);
                        setWelcomeMessage(color.message);
                        setShowWelcome(true);
                      }}
                      className={`w-8 h-8 ${color.className} rounded-md shadow-sm hover:scale-105 transition-transform duration-200`}
                      aria-label={`Set robot color to ${color.name}`}
                    />
                  ))}
                  <button
                    onClick={toggleRainbow}
                    className={`w-8 h-8 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-md shadow-sm hover:scale-105 transition-transform duration-200 ${
                      isRainbow ? "ring-2 ring-yellow-400" : ""
                    }`}
                    aria-label="Toggle rainbow mode"
                  />
                </div>

                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Actions
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {ROBOT_ACTIONS.map((action) => (
                    <button
                      key={action.id}
                      onClick={() =>
                        triggerAction(action.animation, action.message)
                      }
                      className="p-1 text-sm bg-cyan-500 text-white rounded-md shadow-sm hover:bg-cyan-600 hover:scale-105 transition-all duration-200"
                      aria-label={`Make robot ${action.name.toLowerCase()}`}
                    >
                      {action.icon} {action.name}
                    </button>
                  ))}
                </div>

                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Accessories
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      toggleAccessory(
                        "mustache",
                        wearingMustache,
                        setWearingMustache
                      )
                    }
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
                    onClick={() =>
                      toggleAccessory(
                        "sunglasses",
                        wearingSunglasses,
                        setWearingSunglasses
                      )
                    }
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
              </>
            )}

            <div className="mt-4 text-center">
              <button
                className="px-2 py-1 text-xs bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 transition-all duration-200"
                onClick={handleToggleRobot}
                aria-label="Hide robot avatar"
              >
                Hide Robot
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
