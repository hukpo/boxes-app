//
//  CacheImageView.swift
//  boxes
//
//  Created by Pavlo Huk on 30.01.2022.
//

import UIKit
import SDWebImage

final class CacheImageView: UIImageView {
  @objc var headers: [String:String]? = nil
  @objc var uri: String? = nil {
    didSet { self.setupView() }
  }
  
  private func setupView() {
    if self.headers != nil {
      let requestModifier = SDWebImageDownloaderRequestModifier { request in
        var mutableRequest = request
        
        self.headers?.forEach { (header, value) in
          mutableRequest.setValue(value, forHTTPHeaderField: header)
        }
        
        return mutableRequest
      };
      
      SDWebImageDownloader.shared.requestModifier = requestModifier
    }
        
    self.sd_imageIndicator = SDWebImageActivityIndicator.white;
    self.sd_setImage(with: URL(string: self.uri!))
  }
}
