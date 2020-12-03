import { createRouter, createWebHistory } from 'vue-router';

import LoadingScreen from '../components/screens/LoadingScreen.vue';
import HomeScreen from '../components/screens/HomeScreen';
import SwitchesScreen from '../components/screens/SwitchesScreen';
import SettingsScreen from '../components/screens/SettingsScreen';
import LockScreen from '../components/screens/LockScreen';
import VolumeScreen from '../components/screens/VolumeScreen';
import BrightnessScreen from '../components/screens/BrightnessScreen';
import AddSwitchScreen from '../components/screens/AddSwitchScreen';
import AppsScreen from '../components/screens/AppsScreen';

const routes = [
  {
    path: '/',
    name: 'Loading',
    component: LoadingScreen
  },
  {
    path: '/home',
    name: 'Open Home Panel',
    component: HomeScreen
  },
  {
    path: '/switches',
    name: 'Switches',
    component: SwitchesScreen,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsScreen
  },
  {
    path: '/lock',
    name: 'Lock',
    component: LockScreen
  },
  {
    path: '/volume',
    name: 'Volume',
    component: VolumeScreen
  },
  {
    path: '/brightness',
    name: 'Brightness',
    component: BrightnessScreen
  },
  {
    path: '/add_switch',
    name: 'Add Switch',
    component: AddSwitchScreen,
  },
  {
    path: '/apps',
    name: 'Apps',
    component: AppsScreen,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;