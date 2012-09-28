//
//  ChocolateChip.h
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "BaseRecipe.h"

@interface ChocolateChip : BaseRecipe
{
    @protected
    float butter;
}

-(void)addButter:(float)newButter;
-(float)getButter;
-(float)calculateCookieWeight;

@end
