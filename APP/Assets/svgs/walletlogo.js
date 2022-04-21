import * as React from 'react';
import Svg, {
  Defs,
  ClipPath,
  Path,
  LinearGradient,
  Stop,
  G,
} from 'react-native-svg';

function WalletLogo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={984}
      height={1060}
      viewBox="0 0 984 1060"
      {...props}>
      <Defs>
        <ClipPath id="b">
          <Path
            data-name="Rectangle 48"
            transform="translate(45.929 21.112)"
            fill="#fff"
            stroke="#707070"
            strokeWidth={1}
            d="M0 0H984V1060H0z"
          />
        </ClipPath>
        <LinearGradient
          id="a"
          x1={1.087}
          x2={0}
          y2={1}
          gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor="#FEA730" />
          <Stop offset={1} stopColor="#F7465C" />
        </LinearGradient>
        <LinearGradient
          id="c"
          x1={0.833}
          y1={0.063}
          x2={0.046}
          xlinkHref="#a"
        />
      </Defs>
      <G
        data-name="Mask Group 1"
        transform="translate(-45.929 -21.112)"
        clipPath="url(#b)">
        <G data-name="Group 1">
          <Path
            data-name="Path 33"
            d="M436.6 477.022a239.482 239.482 0 01-86.159-36.259 241.658 241.658 0 01-87.3-106.009c-.268-.625-.526-1.26-.784-1.885H106.039l47.39 47.39a54.8 54.8 0 01-77.478 0L1.518 305.826l.109-.109A43.255 43.255 0 010 304.159l111.228-111.227a56.56 56.56 0 012.307 77.531 63.533 63.533 0 018.12-.519h124.282c-.01-.05-.01-.089-.02-.139 6.984 0 17.063.01 25.654.01 9.752 0 15.595-.01 18.4-.01H290a14.823 14.823 0 017.143 2.044 29.276 29.276 0 015.972 4.514 43.556 43.556 0 015.605 6.547l.089-.615a178.674 178.674 0 0025.876 59.005 180.18 180.18 0 0048.471 48.471 178.44 178.44 0 0064.175 27 181 181 0 0072.339 0 178.637 178.637 0 0064.175-27 179.234 179.234 0 0073.808-105.305l.02.1a.031.031 0 01.01-.02 45.361 45.361 0 015.6-6.538 29.947 29.947 0 015.972-4.5 14.823 14.823 0 017.143-2.044h.03c2.956 0 9.166.01 18.462.01 10.714 0 22.966-.01 29.315-.01a242.438 242.438 0 01-2.976 18.065 240.835 240.835 0 01-187.505 187.5 243.525 243.525 0 01-97.121 0zm1.825-125.434a120 120 0 01-20.4-11.071 120.424 120.424 0 01-43.5-52.826 120.473 120.473 0 010-93.47 120.424 120.424 0 0163.9-63.9 120.474 120.474 0 0193.47 0 120.147 120.147 0 0132.45 20.377h74.314q-3.006-5.149-6.339-10.089a179.917 179.917 0 00-78.97-65.016 178.494 178.494 0 00-33.68-10.456 181 181 0 00-72.339 0 178.439 178.439 0 00-64.175 27 180.179 180.179 0 00-48.471 48.471 178.758 178.758 0 00-24.8 54.7 12.933 12.933 0 00-2.51 3.393c-3.581 6.538-7.083 9.821-9.395 11.428a10.409 10.409 0 01-4.2 1.934c-.119.01-12.807.853-25.357.853-3.264 0-6.24-.06-8.869-.179-3.363-.149-7.966-.238-13.69-.268a241.276 241.276 0 013.224-20.079 239.948 239.948 0 0136.259-86.159 241.588 241.588 0 01106.019-87.3A239.8 239.8 0 01436.6 4.891a243.523 243.523 0 0197.121 0A240.664 240.664 0 01655.54 70.574a241.5 241.5 0 0151.646 76.6c.5 1.171.982 2.351 1.458 3.532h139.233l-2.411-2.411a56.54 56.54 0 010-79.978l111.228 111.222a47.654 47.654 0 01-1.627 1.558l.1.1-74.433 74.443a54.786 54.786 0 01-77.468 0l42-42H602.109a120.147 120.147 0 01-163.687 137.949zm22.42-166.226a60.324 60.324 0 1079.085 32.112q-.833-1.964-1.786-3.839h-.813v-1.548a60.409 60.409 0 00-76.486-26.726z"
            transform="translate(34.727 -82.677) rotate(-40.98 839.66 313.592)"
            fill="url(#a)"
          />
        </G>
      </G>
    </Svg>
  );
}

export default WalletLogo;