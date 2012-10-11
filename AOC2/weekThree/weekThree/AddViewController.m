//
//  AddViewController.m
//  weekThree
//
//  Created by Lucy Hutcheson on 10/8/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "AddViewController.h"

@interface AddViewController ()

@end

@implementation AddViewController

@synthesize delegate;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        delegate = nil;
        // Custom initialization
    }
    return self;
}


- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

-(IBAction)saveEvent:(id)sender
{
    
    
    NSDate *date = eventDate.date;
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    if (dateFormatter != nil)
    {
        [dateFormatter setDateFormat:@"MMM dd, h:mm a"];
    }
    
    eventDateFormatted = [dateFormatter stringFromDate:date];
    
    //NSLog(@"%@", eventDateFormatted);
    

    myEvent = [NSString stringWithFormat:@"%@ Date: %@", eventName.text, eventDateFormatted];
        [delegate onSave:myEvent];

    //NSLog(@"%@", myEvent);
    
    [self dismissViewControllerAnimated:YES completion:nil];
}

-(IBAction)closeKeyboard:(id)sender
{

    [eventName resignFirstResponder];
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField
{
    [eventName resignFirstResponder];
    return true;
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
