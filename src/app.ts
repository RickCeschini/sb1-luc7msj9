import { Application } from '@nativescript/core';
import { registerNativeViewElement } from 'svelte-native/dom';

registerNativeViewElement(
  'cameraView',
  () => require('@nativescript/camera').CameraView
);

Application.run({ moduleName: 'app/components/App' });