//
//  BaseRecipe.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "BaseRecipe.h"

@implementation BaseRecipe

-(id)initWithDetails:(int)type name:(NSString *)name
{
    if (self = [super init])
    {
        _type = type;
        _name = name;
    }
    return self;
}


-(void)printName
{
    NSLog(@"I am eating a %@ with a total of %d chocolate chips in it.", _name, _type);
}

@end
