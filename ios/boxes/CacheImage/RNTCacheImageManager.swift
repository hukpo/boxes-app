//
//  RNTCacheImageManager.swift
//  boxes
//
//  Created by Pavlo Huk on 30.01.2022.
//

import UIKit
import SDWebImage

@objc (RNTCacheImageManager)
class RNTCacheImageManager: RCTViewManager {
  
  override init() {
    super.init()

    SDWebImageManager.shared.cacheKeyFilter = SDWebImageCacheKeyFilter { url in
      return url.path.components(separatedBy: "/").last?.description ?? url.absoluteString
    }
  }
 
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
 
  override func view() -> UIView! {
    return CacheImageView()
  }
}
