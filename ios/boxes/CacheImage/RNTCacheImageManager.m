//
//  RNTCacheImageManager.m
//  boxes
//
//  Created by Pavlo Huk on 30.01.2022.
//

#import <React/RCTViewManager.h>
 
@interface RCT_EXTERN_MODULE(RNTCacheImageManager, RCTViewManager)
 
RCT_EXPORT_VIEW_PROPERTY(uri, NSString)
RCT_EXPORT_VIEW_PROPERTY(headers, NSDictionary)

@end
