//
//  ViewController.m
//  weekThree
//
//  Created by Lucy Hutcheson on 10/8/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"
#import "AddViewController.h"

@interface ViewController ()

@end

@implementation ViewController


-(IBAction)onClick:(id)sender
{
    AddViewController *addView = [[AddViewController alloc] initWithNibName:@"AddView" bundle:nil];
    if (addView != nil)
    {
        addView.delegate = self;
        [self presentViewController:addView animated:YES completion:nil];
    }
}



/*------------------------------------------------------------------------------------------ *
 When the Add Event view closes, the newly created event text will be added to the UITextView.
 *------------------------------------------------------------------------------------------ */

-(void)onSave:(NSString*)myEvent
{
    
    // If this is my first event, delete my default text
    if (counter == 0)
    {
        eventDisplay.text = @"";
        eventDisplay.text = [eventDisplay.text stringByAppendingString:myEvent];
    }
    // If this is the second or more event, add it to my first or existing events
    else
    {
        eventDisplay.text = [eventDisplay.text stringByAppendingString:myEvent];
    }
    counter ++;
}



- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
