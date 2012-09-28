//
//  Snickerdoodle.h
//  weekOne
//
//  Created by Lucy Hutcheson on 9/27/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "BaseRecipe.h"

@interface Snickerdoodle : BaseRecipe
{
    @protected
    float cinnamon;
}

-(void)addCinnamon:(float)newCinnamon;
-(float)getCinnamon;


-(float)calculateCookieWeight;

@end
