import DeviceInfo from 'react-native-device-info';

const DATA = [
  // Hardware data
  {title: 'Device Manufacturer', info: DeviceInfo.getManufacturer()},
  {title: 'Device Name', info: DeviceInfo.getDeviceName()},
  {title: 'Device Model', info: DeviceInfo.getModel()},
  {title: 'Device Unique ID', info: DeviceInfo.getUniqueId()},
  {title: 'User Agent', info: DeviceInfo.getUserAgent()},
  // device data
  {title: 'Device System Name', info: DeviceInfo.getSystemName()},
  {title: 'Device ID', info: DeviceInfo.getDeviceId()},
  {title: 'Device Version', info: DeviceInfo.getSystemVersion()},
  // app data
  {title: 'Bundle Id', info: DeviceInfo.getBundleId()},
  {title: 'Build Number', info: DeviceInfo.getBuildNumber()},
  {title: 'App Version', info: DeviceInfo.getVersion()},
  {title: 'App Version (Readable)', info: DeviceInfo.getReadableVersion()},
];

const getData = async items => {
  const data = await Promise.all(
    items.map(async item => {
      return {
        [item.title]: await item.info,
      };
    }),
  );
  return data;
};

const getDeviceData = async () => {
  const data = await getData(DATA);
  return data;
};

export default getDeviceData;
