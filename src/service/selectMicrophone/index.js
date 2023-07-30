import { useState } from "react";

export async function microphone() {
  let micDetected = "";

  const data = await navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      let inputDevice = devices.filter((device) => {
        return device.kind === "audioinput";
      });
      micDetected = inputDevice;
    })
    .catch((e) => {
      console.log("Error find device ", e);
    });
  return micDetected;
}

export async function switchMicrophone(deviceId) {
  if (deviceId) {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: deviceId,
        },
      })
      .then((stream) => {
        console.log("New Microphone switch ", stream);
      })
      .catch(e => {
        console.log("Cannot switch mic ", e)
      })
  }
}
