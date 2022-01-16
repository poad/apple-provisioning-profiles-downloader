export type BundleIdPlatform = 'IOS' | 'MAC_OS';

export type ProfileType =
  | 'IOS_APP_DEVELOPMENT'
  | 'IOS_APP_STORE'
  | 'IOS_APP_ADHOC'
  | 'IOS_APP_INHOUSE'
  | 'MAC_APP_DEVELOPMENT'
  | 'MAC_APP_STORE'
  | 'MAC_APP_DIRECT'
  | 'TVOS_APP_DEVELOPMENT'
  | 'TVOS_APP_STORE'
  | 'TVOS_APP_ADHOC'
  | 'TVOS_APP_INHOUSE'
  | 'MAC_CATALYST_APP_DEVELOPMENT'
  | 'MAC_CATALYST_APP_STORE'
  | 'MAC_CATALYST_APP_DIRECT';
export type ProfileState = 'ACTIVE' | 'INVALID';

export interface ResourceLinks {
  self: string;
}

export interface BundleId {
  type: 'bundleIds';
  id: string;
  attributes: {
    name?: string;
    platform?: BundleIdPlatform;
    identifier?: string;
    seedId?: string;
  };
  relationships: {
    profiles?: {
      links: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'profiles';
          id: string;
        }
      ];
    };
    bundleIdCapabilities?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'bundleIdCapabilities';
          id: string;
        }
      ];
    };
    app?: {
      links?: {
        self?: string;
        related?: string;
      };
      data: {
        type: 'app';
        id: string;
      };
    };
  };
  links: ResourceLinks;
}

export interface Profile {
  type: 'profiles';
  id: string;
  attributes: {
    name?: string;
    platform?: BundleIdPlatform;
    profileType?: ProfileType;
    profileState?: ProfileState;
    profileContent?: string;
    uuid?: string;
    createdDate?: Date;
    expirationDate?: Date;
  };
  relationships: {
    bundleId?: {
      links?: {
        self?: string;
        related?: string;
      };
      data: {
        type: 'bundleIds';
        id: string;
      };
    };
    devices?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'devices';
          id: string;
        }
      ];
    };
    certificates?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'certificates';
          id: string;
        }
      ];
    };
  };
  links: ResourceLinks;
}

export interface CapabilityOption {
  key:
    | 'XCODE_5'
    | 'XCODE_6'
    | 'COMPLETE_PROTECTION'
    | 'PROTECTED_UNLESS_OPEN'
    | 'PROTECTED_UNTIL_FIRST_USER_AUTH'
    | 'PRIMARY_APP_CONSENT';
  name: string;
  description: string;
  enabledByDefault: boolean;
  enabled: boolean;
  supportsWildcard: boolean;
}

export interface CapabilitySetting {
  key?:
    | 'ICLOUD_VERSION'
    | 'DATA_PROTECTION_PERMISSION_LEVEL'
    | 'APPLE_ID_AUTH_APP_CONSENT';
  name?: string;
  description?: string;
  enabledByDefault?: boolean;
  visible?: boolean;
  allowedInstances?: 'ENTRY' | 'SINGLE' | 'MULTIPLE';
  minInstances?: number;
  options?: CapabilityOption[];
}

export interface BundleIdCapability {
  type: 'bundleIdCapabilities';
  id: string;
  attributes: {
    capabilityType?:
      | 'ICLOUD'
      | 'IN_APP_PURCHASE'
      | 'GAME_CENTER'
      | 'PUSH_NOTIFICATIONS'
      | 'WALLET'
      | 'INTER_APP_AUDIO'
      | 'MAPS'
      | 'ASSOCIATED_DOMAINS'
      | 'PERSONAL_VPN'
      | 'APP_GROUPS'
      | 'HEALTHKIT'
      | 'HOMEKIT'
      | 'WIRELESS_ACCESSORY_CONFIGURATION'
      | 'APPLE_PAY'
      | 'DATA_PROTECTION'
      | 'SIRIKIT'
      | 'NETWORK_EXTENSIONS'
      | 'MULTIPATH'
      | 'HOT_SPOT'
      | 'NFC_TAG_READING'
      | 'CLASSKIT'
      | 'AUTOFILL_CREDENTIAL_PROVIDER'
      | 'ACCESS_WIFI_INFORMATION'
      | 'NETWORK_CUSTOM_PROTOCOL'
      | 'COREMEDIA_HLS_LOW_LATENCY'
      | 'SYSTEM_EXTENSION_INSTALL'
      | 'USER_MANAGEMENT'
      | 'APPLE_ID_AUTH';
    settings?: CapabilitySetting[];
  };
  links: ResourceLinks;
}

export interface App {
  type: 'apps';
  id: string;
  attributes: {
    name?: string;
    bundleId?: string;
    sku?: string;
    primaryLocale?: string;
    isOrEverWasMadeForKids?: boolean;
    availableInNewTerritories?: boolean;
    contentRightsDeclaration?:
      | 'DOES_NOT_USE_THIRD_PARTY_CONTENT'
      | 'USES_THIRD_PARTY_CONTENT';
  };
  relationships: {
    betaGroups?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'betaGroups';
          id: string;
        }
      ];
    };
    appStoreVersions?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'appStoreVersions';
          id: string;
        }
      ];
    };
    preReleaseVersions?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'preReleaseVersions';
          id: string;
        }
      ];
    };
    betaAppLocalizations?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'betaAppLocalizations';
          id: string;
        }
      ];
    };
    builds?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'builds';
          id: string;
        }
      ];
    };
    betaLicenseAgreement?: {
      links?: {
        self?: string;
        related?: string;
      };
      data: [
        {
          type: 'betaLicenseAgreement';
          id: string;
        }
      ];
    };
    betaAppReviewDetail?: {
      links?: {
        self?: string;
        related?: string;
      };
      data: [
        {
          type: 'betaAppReviewDetail';
          id: string;
        }
      ];
    };
    appInfos?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'appInfos';
          id: string;
        }
      ];
    };
    endUserLicenseAgreement?: {
      links?: {
        self?: string;
        related?: string;
      };
      data: [
        {
          type: 'endUserLicenseAgreement';
          id: string;
        }
      ];
    };
    preOrder?: {
      links?: {
        self?: string;
        related?: string;
      };
      data: [
        {
          type: 'preOrder';
          id: string;
        }
      ];
    };
    availableTerritories?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'availableTerritories';
          id: string;
        }
      ];
    };
    inAppPurchases?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'inAppPurchases';
          id: string;
        }
      ];
    };
    gameCenterEnabledVersions?: {
      links?: {
        self?: string;
        related?: string;
      };
      meta: PagingInformation;
      data: [
        {
          type: 'gameCenterEnabledVersions';
          id: string;
        }
      ];
    };
  };
  links: ResourceLinks;
}

export interface PagedDocumentLinks {
  self: string;
  first?: string;
  next?: string;
}

export interface PagingInformation {
  paging: {
    total: number;
    limit: number;
  };
}

export interface BundleIdsResponse {
  data: BundleId[];
  included: (Profile | BundleIdCapability | App)[];
  links: PagedDocumentLinks;
  meta: PagingInformation;
}

export interface ErrorResponse {
  errors: [
    {
      status: string;
      code: string;
      title: string;
      detail: string;
    }
  ];
}

const Types = (): void => {};

export default Types;
