//
//  ViewController.m
//  testApp
//
//  Created by Lucy Hutcheson on 8/12/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController



/* =========================================================================================================== *
 * MY FUNCTIONS                                                                                                *
 * =========================================================================================================== */


/*------------------------------------------------------------------------------------------------------------ *
 * 1. ADD FUNCTION                                                                                             *
 *      Create a function called Add. This function will take two NSInteger or int types and                   *
 *      return the result of an addition between these two.                                                    *
 *------------------------------------------------------------------------------------------------------------ */

- (int)Add:(NSInteger)addOne addTwo:(NSInteger)addTwo
{
    return addOne + addTwo;
}


/*------------------------------------------------------------------------------------------------------------ *
 * 2. COMPARE FUNCTION                                                                                         *
 *      Create a BOOL function called Compare that takes two NSInteger values.                                 *
 *      Return YES or NO based on whether the values are equal.                                                *
 *------------------------------------------------------------------------------------------------------------ */

- (BOOL)Compare:(NSInteger)compareOne compareTwo:(NSInteger)compareTwo
{
    return (compareOne == compareTwo); 
}


/*------------------------------------------------------------------------------------------------------------ *
 * 3. APPEND FUNCTION                                                                                          *
 *      Create a function called Append. This function will take two NSStrings and                             *
 *      return a new NSString containing the appended strings using an NSMutableString and the Append method.  *
 *------------------------------------------------------------------------------------------------------------ */

- (NSString *)Append:(NSString *)stringOne stringTwo:(NSString *)stringTwo
{
    NSMutableString *newString = [[NSMutableString alloc] initWithFormat:stringOne];
    [newString appendString:stringTwo];
    return newString;
}


/*------------------------------------------------------------------------------------------------------------ *
 * 5. DISPLAYALERTWITHSTRING FUNCTION                                                                          *
 *      Create a function called DisplayAlertWithString. This function will take as a parameter an NSString.   *
 *------------------------------------------------------------------------------------------------------------ */

- (void)DisplayAlertWithString:(NSString *)alertString customTitle:(NSString *)customTitle
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:customTitle message:alertString delegate:nil cancelButtonTitle:@"Okay" otherButtonTitles:nil];
    if (alertView != nil) 
    {
        [alertView show];
    }
}


/* =========================================================================================================== *
 * END OF MY FUNCTIONS                                                                                         *
 * =========================================================================================================== */


- (void)viewDidLoad
{      
    
    /*------------------------------------------------------------------------------------------------------------ *
     * 4.  Call the Append function with two NSStrings. Capture the result and                                     *
     *     display a UIAlertView with the appended string using displayAlertWithString.                            *
     *------------------------------------------------------------------------------------------------------------ */

    NSString *alertString = [self Append:@"Mobile Web Development " stringTwo:@"Rocks!!"];
    [self DisplayAlertWithString:alertString customTitle:@"Alert"];
   
    
    /*------------------------------------------------------------------------------------------------------------ *
     * 6.  Call the Add function passing in two integer values.                                                    *
     *     Capture the return of this function into a variable.                                                    *
     *------------------------------------------------------------------------------------------------------------ */

    int addResult = [self Add:5 addTwo:8];

    
    /*------------------------------------------------------------------------------------------------------------ *
     * 7.  Bundle the returned integer into an NSNumber and then convert it to a NSString and                      *
     *     pass it to the DisplayAlertWithString function.                                                         *
     *------------------------------------------------------------------------------------------------------------ */    

    NSNumber *bundleNumber = [NSNumber numberWithInt:addResult];      
    NSString *bundleString = [bundleNumber stringValue];


    /*------------------------------------------------------------------------------------------------------------ *
     * 8.  Give it some text for the title. The message will read, "The number is 00".                             *
     *     Replace the 00 with the integer passed into the function.                                               *
     *------------------------------------------------------------------------------------------------------------ */    

    NSString *alertStringTwo = [self Append:@"The number is " stringTwo:bundleString];
    [self DisplayAlertWithString:alertStringTwo customTitle:@"Announcement"];

    
    /*------------------------------------------------------------------------------------------------------------ *
     * 9.  Call the Compare function with two integer values. If Compare returns YES, display an UIAlertView       *
     *     both with the input values and the result using the DisplayAlertWithString function                     *
     *------------------------------------------------------------------------------------------------------------ */    
    
    NSInteger compareNumOne = 22;
    NSInteger compareNumTwo = 22;
    BOOL compareResult = [self Compare:compareNumOne compareTwo:compareNumTwo];
    
    if (compareResult == YES)
    {
        NSString *myResult = [NSString stringWithFormat:@"%@", compareResult ? @"YES" : @"NO"];
        NSString *message = [NSString stringWithFormat:@"Integer One = %i and Integer Two = %i.  %@, they are equal.",compareNumOne,compareNumTwo, myResult];
        [self DisplayAlertWithString:message customTitle:@"Results"];
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
