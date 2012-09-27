//
//  ChocolateChip.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ChocolateChip.h"

@implementation ChocolateChip

-(id)init
{
    if (self = [super init])
    {
        [self setAttributes:CREATURETYPE_UNICORN name:@"Unicorn" isMythical:TRUE];
    }
    return self;
}

-(void)printName
{
    [super printName];
    NSLog(@"The name of this creature is = %@", creatureName);
}


@end
