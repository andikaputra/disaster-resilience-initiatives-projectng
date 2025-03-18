interface Navigator {
    xr?: XRSystem;
}

interface XRSystem {
    isSessionSupported: (sessionType: XRSessionMode) => Promise<boolean>;
    requestSession: (sessionType: XRSessionMode, options?: XRSessionInit) => Promise<XRSession>;
}

type XRSessionMode = 'inline' | 'immersive-vr' | 'immersive-ar';

interface XRSessionInit {
    optionalFeatures?: string[];
    requiredFeatures?: string[];
}

interface XRSession {
    end: () => Promise<void>;
}
