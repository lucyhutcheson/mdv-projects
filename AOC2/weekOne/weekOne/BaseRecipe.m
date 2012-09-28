//
//  BaseRecipe.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "BaseRecipe.h"

@implementation BaseRecipe

-(id)initWithDetails:(int)type name:(NSString*)name 
{
    if (self = [super init])
    {
        cookieName = name;
        cookieType = type;
        baseWeight = 0.43;
        chipWeight = 0.06;
    }
    return self;
}

// Accessors
-(NSString*)getCookieName
{
    NSLog(@"I am a %@ cookie.", cookieName);
    return cookieName;
}
-(int)getChipNumber
{
    NSLog(@"I have a total number of %d chocolate chips.", cookieType);
    return cookieType;
}
-(float)getbaseWeight
{
    NSLog(@"I have a base weight of %f.", baseWeight);
    return baseWeight;
}
-(float)getChipWeight
{
    NSLog(@"My chocolate chips weigh %f.", chipWeight);
    return chipWeight;
}
-(void)printName
{
    NSLog(@"I am eating a %@ cookie with a total of %d chocolate chips in it. ", cookieName, cookieType);
}


// Mutators
-(void)setCookieName:(NSString*)newCookieName
{
    cookieName = newCookieName;
}
-(void)setChipNumber:(int)newChipNumber
{
    cookieType = newChipNumber;
}


// Calculation
-(float)calculateCookieWeight
{
    if (cookieType != 0)
    {
        NSLog(@"This cookie weighs %.2f oz.", ( baseWeight + ((float)cookieType * chipWeight)));
        return ( baseWeight + ((float)cookieType * chipWeight));
    }
    else {
        NSLog(@"This cookie weighs %.2f oz.", ( baseWeight + ((float)cookieType * chipWeight)));
        return ( baseWeight + (1 * chipWeight));
    }
}


@end
