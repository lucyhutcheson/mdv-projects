//
//  Oatmeal.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/27/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "Oatmeal.h"
#import "BaseRecipe.h"

@implementation Oatmeal


-(id)initWithDetails:(int)type name:(NSString*)name 
{
if (self = [super init])
{
    cookieName = @"Oatmeal Chocolate Chip";
    cookieType = CHOCOLATECHIPOATMEAL;
    chipWeight = 0.7; // Added white chocolate chips also
    oatmeal = 0.3;
}
return self;
}


// Override Calculation
-(float)calculateCookieWeight
{
    
    NSLog(@"This cookie has more butter and now weighs %.2f oz.", ( baseWeight + ((float)cookieType * chipWeight)));
    return (baseWeight + ((float)cookieType * chipWeight));
}


-(void)addOatmeal:(float)newOatmeal
{
    oatmeal = newOatmeal;
}
-(float)getOatmeal
{
    NSLog(@"Weight of additional oatmeal is %.2f oz.", oatmeal);
    return oatmeal;
}

@end
