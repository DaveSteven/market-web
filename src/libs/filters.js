import Vue from 'vue'
import { parseMoney, getSerialNumber } from './util'

Vue.filter('parseMoney', parseMoney)
Vue.filter('getSerialNumber', getSerialNumber)
