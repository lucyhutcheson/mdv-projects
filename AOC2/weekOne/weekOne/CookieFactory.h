//
//  CookieFactory.h
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BaseRecipe.h"


@interface CookieFactory : NSObject

// Cookie Factory Creation
+(BaseRecipe*)GetCookie:(int)cookieType;

@end
