//
//  CookieFactory.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "CookieFactory.h"
#import "BaseRecipe.h"

@implementation CookieFactory

+(BaseRecipe*)GetCookie:(int)cookieType
{
    if (cookieType == CHOCOLATECHIP)
    {
        return [[BaseRecipe alloc] initWithDetails:CHOCOLATECHIP name:@"Chocolate Chip"];
    }
    else if (cookieType == CHOCOLATECHIPOATMEAL)
    {
        return [[BaseRecipe alloc] initWithDetails:CHOCOLATECHIPOATMEAL name:@"Chocolate Chip Oatmeal"];
    }
    else if (cookieType == SNICKERDOODLE)
    {
        return [[BaseRecipe alloc] initWithDetails:SNICKERDOODLE name:@"Snickerdoole"];
    }
    return nil;
}
@end
