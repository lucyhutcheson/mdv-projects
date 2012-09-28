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
    myCookie count;
    int cookieType;
    NSString *cookieName;
    float baseWeight;
    float chipWeight;
}


//-(void)setAttributes:(myCookie)type name:(NSString*)name isDelicious:(BOOL)isDelicious;
-(id)initWithDetails:(int)type name:(NSString*)name;

// Accessors
-(NSString*)getCookieName;
-(int)getChipNumber;
-(float)getbaseWeight;
-(float)getChipWeight;

// Mutators to change the values of the above variables
-(void)setCookieName:(NSString*)newCookieName;
-(void)setChipNumber:(int)newChipNumber;

// Calculation Method
-(float)calculateCookieWeight;

-(void)printName;


@end
