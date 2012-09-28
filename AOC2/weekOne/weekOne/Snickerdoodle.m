//
//  Snickerdoodle.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/27/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "Snickerdoodle.h"
#import "BaseRecipe.h"

@implementation Snickerdoodle


-(id)initWithDetails:(int)type name:(NSString*)name 
{
if (self = [super init])
{
    cookieName = @"Snickerdoodle";
    cookieType = SNICKERDOODLE;
    chipWeight = 0.7; // Added white chocolate chips also
    cinnamon = 0.2;
}
return self;
}


// Override Calculation
-(float)calculateCookieWeight
{
    
    NSLog(@"This cookie has more butter and now weighs %.2f oz.", ( baseWeight + ((float)cookieType * chipWeight)));
    return (baseWeight + ((float)cookieType * chipWeight));
}

-(void)addCinnamon:(float)newCinnamon
{
    cinnamon = newCinnamon;
}
-(float)getCinnamon
{
    NSLog(@"Weight of additional oatmeal is %.2f oz.", cinnamon);
    return cinnamon;
}


@end
