//
//  ViewController.m
//  testApp
//
//  Created by Lucy Hutcheson on 8/12/12.
//  Copyright (c) 2012 Pure Light Designs. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{  
    
    /* 1.   Create a function called Add. This function will take two NSInteger or int types and 
     *      return the result of an addition between these two.
     * ============================================================================================= */
    [self Add:5 addTwo:8];
    
    [self Compare:12 compareTwo:22];
    
    [self Append:@"Hello " stringTwo:@"World!"];
   
    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}



/*------------------------------------------------------------------------------------------------------------ *
 * ADD FUNCTION                                                                                                *
 *      Create a function called Add. This function will take two NSInteger or int types and                   *
 *      return the result of an addition between these two.                                                    *
 *------------------------------------------------------------------------------------------------------------ */

- (int)Add:(NSInteger)addOne addTwo:(NSInteger)addTwo
{
    int result = addOne + addTwo;
    NSLog(@"%d plus %d equals to %d", addOne, addTwo, result);
    return addOne + addTwo;
}

/*------------------------------------------------------------------------------------------------------------ *
 * COMPARE FUNCTION                                                                                            *
 *      Create a BOOL function called Compare that takes two NSInteger values.                                 *
 *      Return YES or NO based on whether the values are equal.                                                *
 *------------------------------------------------------------------------------------------------------------ */

- (BOOL)Compare:(NSInteger)compareOne compareTwo:(NSInteger)compareTwo
{
    if (compareOne == compareTwo) 
    {
        NSLog(@"Yes");
        return YES;
    }
    else 
    {
        NSLog(@"No");
        return NO;
    }
}

/*------------------------------------------------------------------------------------------------------------ *
 * APPEND FUNCTION                                                                                             *
 *      Create a function called Append. This function will take two NSStrings and                             *
 *      return a new NSString containing the appended strings using an NSMutableString and the Append method.  *
 *------------------------------------------------------------------------------------------------------------ */

- (NSString *)Append:(NSString *)stringOne stringTwo:(NSString *)stringTwo
{
    NSMutableString *newString = [[NSMutableString alloc] initWithFormat:stringOne];
    [newString appendString:stringTwo];
    NSLog(@"%@", newString);
    return newString;
}






- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

@end
