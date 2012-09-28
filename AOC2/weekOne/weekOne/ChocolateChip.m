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
        baseWeight = 0.5; // Used more butter than normal
        butter = 0.2;
    }
    return self;
}


// Override Calculation
-(float)calculateCookieWeight
{
    
    NSLog(@"This cookie has more butter and now weighs %.2f oz.", ( baseWeight + ((float)cookieType * chipWeight)));
    return (baseWeight + ((float)cookieType * chipWeight));
}

-(void)addButter:(float)newButter
{
    butter = newButter;
}

-(float)getButter
{
    NSLog(@"Weight of additional butter is %.2f oz.", butter);
    return butter;
}



@end
