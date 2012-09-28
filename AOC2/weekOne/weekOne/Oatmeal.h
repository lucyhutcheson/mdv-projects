//
//  Oatmeal.h
//  weekOne
//
//  Created by Lucy Hutcheson on 9/27/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "BaseRecipe.h"

@interface Oatmeal : BaseRecipe
{
    @protected
    float oatmeal;
}

-(void)addOatmeal:(float)newOatmeal;
-(float)getOatmeal;

-(float)calculateCookieWeight;

@end
