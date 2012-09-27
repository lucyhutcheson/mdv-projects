//
//  ChocolateChip.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ChocolateChip.h"
#import "BaseRecipe.h"

@implementation ChocolateChip

-(id)initWithDetails:(int)type name:(NSString*)name
{
    if (self = [super init])
    {
        cookieName = @"Chocolate Chip";
        cookieType = CHOCOLATECHIP;
    }
    return self;
}

-(void)printName
{
    [super printName];
    NSLog(@"Ewwww! I am eating a %@ with a total of %d chocolate chips in it.", cookieName, cookieType);
}


@end
