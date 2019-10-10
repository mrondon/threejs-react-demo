import React, { useEffect, useState } from "react";
import "./App.css";
import Renderer from "./scene";

const SEGMENTS = 4;

const App: React.FC = () => {
  const [segments, setSegments] = useState(SEGMENTS);
  const [scene, setScene] = useState();
  const [hasShadows, setShadows] = useState(false);
  const [materialType, setMaterialType] = useState("basic");
  const [hasFloorTexture, setFloorTexture] = useState(false);
  const [repeat, setRepeat] = useState(1);
  const [bumpScale, setBumpScale] = useState(0);
  const [roughness, setRoughness] = useState(false);
  const [mtlFile, setMTL] = useState("");
  const [objFile, setOBJ] = useState("");
  const [jpgMapFile, setJPGMap] = useState("");
  const [jpgLightFile, setJPGLight] = useState("");
  const [jpgBumpFile, setJPGBump] = useState("");
  const [jpgSpecFile, setJPGSpec] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    setScene(Renderer.init("scene"));
  }, []);

  const onSegmentsChange = (event: any) => {
    const value = Number(event.target.value);
    if (value !== segments) {
      const sphere = scene.getObjectByName("sphere");
      scene.add(Renderer.updateSphereSegments(sphere as any, 1, value));
      setSegments(value);
      if (step < 2) {
        setStep(2);
      }
    }
  };

  const onMaterialChange = () => {
    const value = materialType === "basic" ? "standard" : "basic";
    const sphere = scene.getObjectByName("sphere");
    Renderer.setSphereMaterialType(sphere, value);
    setMaterialType(value);
    if (step < 3) {
      setStep(3);
    }
  };

  const onShadowChange = () => {
    const value = !hasShadows;
    const sphere = scene.getObjectByName("sphere");
    sphere.castShadow = value;
    sphere.receiveShadow = value;
    setShadows(value);
    if (step < 4) {
      setStep(4);
    }
  };

  const onFloorTextureChange = () => {
    const value = !hasFloorTexture;
    if (value) {
      const floor = scene.getObjectByName("floor");
      Renderer.setFloorMaterials(floor);
      // scene.add(setFloorMaterials(floor));
      setFloorTexture(value);
    }
    if (step < 5) {
      setStep(5);
    }
    // scene.add(updateSphereShadows(sphere, value));
  };

  const onBGRepeatChange = (event: any) => {
    const value = Number(event.target.value);
    const floor = scene.getObjectByName("floor");
    Renderer.setAdvancedFloorMaterials(floor, value, bumpScale, roughness);
    setRepeat(value);
  };

  const onBumpScaleChange = (event: any) => {
    const value = Number(event.target.value);
    const floor = scene.getObjectByName("floor");
    Renderer.setAdvancedFloorMaterials(floor, repeat, value, roughness);
    setBumpScale(value);
  };

  const onRoughnessChange = () => {
    const value = !roughness;
    const floor = scene.getObjectByName("floor");
    Renderer.setAdvancedFloorMaterials(floor, repeat, bumpScale, value);
    setRoughness(value);
    if (step < 6) {
      setStep(6);
    }
  };

  const onSphereFill = () => {
    const sphere = scene.getObjectByName("sphere");
    Renderer.setSphereMaterials(sphere);
    if (step < 7) {
      setStep(7);
    }
  };

  //file stuff
  const handleOBJ = (event: any) => {
    if (event.target.files && event.target.files.length) {
      const newFile = URL.createObjectURL(event.target.files[0]);
      console.log("adsad", newFile);
      setOBJ(newFile);
    }
  };

  //file stuff
  const handleMTL = (event: any) => {
    if (event.target.files && event.target.files.length) {
      const newFile = URL.createObjectURL(event.target.files[0]);
      console.log("adsad", newFile);
      setMTL(newFile);
    }
  };
  const handleJPGMap = async (event: any) => {
    if (event.target.files && event.target.files.length) {
      const newFile = URL.createObjectURL(event.target.files[0]);
      console.log("adsad", newFile);
      await setJPGMap(newFile);
      Renderer.loadObject(
        scene,
        objFile,
        mtlFile,
        newFile,
        jpgBumpFile,
        jpgSpecFile,
        jpgLightFile
      );
    }
  };
  const handleJPGBump = async (event: any) => {
    if (event.target.files && event.target.files.length) {
      const newFile = URL.createObjectURL(event.target.files[0]);
      console.log("adsad", newFile);
      await setJPGBump(newFile);
      Renderer.loadObject(
        scene,
        objFile,
        mtlFile,
        jpgMapFile,
        newFile,
        jpgSpecFile,
        jpgLightFile
      );
    }
  };
  const handleJPGSpec = async (event: any) => {
    if (event.target.files && event.target.files.length) {
      const newFile = URL.createObjectURL(event.target.files[0]);
      await setJPGSpec(newFile);
      Renderer.loadObject(
        scene,
        objFile,
        mtlFile,
        jpgMapFile,
        jpgBumpFile,
        newFile,
        jpgLightFile
      );
    }
  };
  const handleJPGLight = async (event: any) => {
    if (event.target.files && event.target.files.length) {
      const newFile = URL.createObjectURL(event.target.files[0]);
      console.log("adsad", newFile);
      await setJPGLight(newFile);
      Renderer.loadObject(
        scene,
        objFile,
        mtlFile,
        jpgMapFile,
        jpgBumpFile,
        jpgSpecFile,
        newFile
      );
    }
  };

  const addCoke = () => {
    Renderer.addSomeCoke(scene);
    if (step < 8) {
      setStep(8);
    }
  };

  return (
    <div className="App">
      <div className="scene" id="scene" />
      <div className={`controls active${step}`}>
        <div className="step step1">
          1. That's not a %^*# Sphere :S <br />
          set sphere segments:{" "}
          <input
            type="number"
            value={segments}
            min={4}
            max={64}
            onChange={onSegmentsChange}
          />
          <hr />
        </div>
        <div className="step step2">
          2. That's a circle, not a sphere :S<br />
          <input
            type="checkbox"
            checked={materialType === "standard"}
            onChange={onMaterialChange}
          />{" "}
          Enable Sphere Material
          <hr />
        </div>
        <div className="step step3">
          3. Where are the shadows? :S<br />
          <input
            type="checkbox"
            checked={hasShadows}
            onChange={onShadowChange}
          />{" "}
          Enable Sphere Shadows
          <hr />
        </div>
        <div className="step step4">
          4. floor texture? :S<br />
          <input
            type="checkbox"
            checked={hasFloorTexture}
            onChange={onFloorTextureChange}
            // disabled={hasFloorTexture}
          />{" "}
          Enable Floor Texture
          <hr />
        </div>
        <div className="step step5">
          5. Fine, welcome to DOOM.EXE :S<br />
          Background Repeat:{" "}
          <input
            type="number"
            onChange={onBGRepeatChange}
            disabled={!hasFloorTexture}
            value={repeat}
            min={1}
            max={10}
            // disabled={hasFloorTexture}
          />{" "}
          <br />
          Bump Texture scale:{" "}
          <input
            type="number"
            onChange={onBumpScaleChange}
            disabled={!hasFloorTexture}
            value={bumpScale}
            min={0}
            max={5}
            step={0.1}
            // disabled={hasFloorTexture}
          />{" "}
          <br />
          <input
            type="checkbox"
            checked={roughness}
            onChange={onRoughnessChange}
            disabled={!hasFloorTexture}
          />{" "}
          Enable Floor Roughness
        </div>
        <div className="step step6">
          6. Cool! let's{" "}
          <button onClick={onSphereFill}>do the same for the sphere</button>
          <br />
        </div>
        <div className="step step7">
          7. Can I make a coke can? <br />
          <button onClick={addCoke}>No, you can't</button>
          <div id="canvas-wrapper" />
        </div>

        <div className="step step8">
          8. Now I Want a Car...<br />
          OBJ: <input type="file" onChange={handleOBJ} accept=".obj" />
          <br />
          MTL: <input type="file" onChange={handleMTL} accept=".mtl" />
          <br />
          MAP: <input type="file" onChange={handleJPGMap} accept=".jpg" />
          <br />
          SPEC: <input type="file" onChange={handleJPGSpec} accept=".jpg" />
          <br />
          BUMP: <input type="file" onChange={handleJPGBump} accept=".jpg" />
          <br />
          LIGHT: <input type="file" onChange={handleJPGLight} accept=".jpg" />
          <br />
        </div>
      </div>
    </div>
  );
};

export default App;
