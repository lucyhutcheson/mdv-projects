//
//  ViewController.m
//  weekOne
//
//  Created by Lucy Hutcheson on 9/26/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"
#import "CookieFactory.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    BaseRecipe *basecookie = [[BaseRecipe alloc] init];
    
    float cookieweight = [basecookie calculateCookieWeight];
    NSLog(@"my cookie has a weight of %f", cookieweight);
    
    BaseRecipe *chocolatechip = [CookieFactory GetCookie:CHOCOLATECHIP];
    if (chocolatechip != nil)
    {
        [chocolatechip printName];
    }
    
    BaseRecipe *chocolatechipoatmeal = [CookieFactory GetCookie:CHOCOLATECHIPOATMEAL];
    if (chocolatechipoatmeal != nil)
    {
        [chocolatechipoatmeal printName];
    }
    
    BaseRecipe *snickerdoodle = [CookieFactory GetCookie:SNICKERDOODLE];
    if (snickerdoodle != nil)
    {
        [snickerdoodle printName];
    }

    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

@end
