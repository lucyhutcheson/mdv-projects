//
//  CookieFactory.h
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BaseRecipe.h"

typedef enum
{
    SNICKERDOODLE = 0,
    CHOCOLATECHIP,
    CHOCOLATECHIPOATMEAL
}myCookie;

@interface CookieFactory : NSObject

+(BaseRecipe*)GetCookie:(int)cookieType;

@end
