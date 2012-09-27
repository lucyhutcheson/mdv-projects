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
    CHOCOLATECHIPOATMEAL = 6,
    CHOCOLATECHIP
}myCookie;

@interface BaseRecipe : NSObject
{
    @protected
    int cookieType;
    NSString *cookieName;
}

//-(void)setAttributes:(myCookie)type name:(NSString*)name isDelicious:(BOOL)isDelicious;
-(id)initWithDetails:(int)type name:(NSString*)name;

-(void)printName;

@end
