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
-(float)getCookieWeight
{
    NSLog(@"I have a weight of %f.", cookieWeight);
    return cookieWeight;
}
-(float)getChipWeight
{
    NSLog(@"My chocolate chips weigh %f.", chipWeight);
    return chipWeight;
}

// Mutators
-(void)setCookieName:(NSString*)newCookieName
{
    cookieName = newCookieName;
}
-(void)setChipNumber:(int)newChipNumber
{
    chipNumber = newChipNumber;
}

-(float)cookieWeight
{
    return baseWeight ;
}


-(void)printName
{
    NSLog(@"I am eating a %@ cookie with a total of %d chocolate chips in it. It weighs %f", cookieName, cookieType, cookieWeight);
}

@end
