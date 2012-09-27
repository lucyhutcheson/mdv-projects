//
//  BaseRecipe.h
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef enum
{
    SNICKERDOODLE = 0,
    CHOCOLATECHIP,
    CHOCOLATECHIPOATMEAL
}myCookie;

@interface BaseRecipe : NSObject
{
    myCookie count;
    int _type;
    NSString *_name;
}

-(id)initWithDetails:(int)type name:(NSString*)name;
-(void)printName;

@end
