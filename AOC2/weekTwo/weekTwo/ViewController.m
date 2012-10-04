//
//  ViewController.m
//  weekTwo
//
//  Created by Lucy Hutcheson on 10/3/12.
//  Copyright (c) 2012 Lucy Hutcheson. All rights reserved.
//

#import "ViewController.h"
#import "SecondViewController.h"


@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

-(IBAction)onClick:(id)sender
{
    SecondViewController *viewController = [[SecondViewController alloc] initWithNibName:@"SecondView" bundle:nil];
    
    if (viewController != nil)
    {
        [self presentViewController:viewController animated:YES completion:nil];
    }
}

-(IBAction)onChange:(id)sender
{
    UISegmentedControl *segControl = (UISegmentedControl*)sender;
    if(segControl != nil)
    {
        int selectedIndex = segControl.selectedSegmentIndex;
        if (selectedIndex == 0)
        {
            self.view.backgroundColor = [UIColor whiteColor];
        }
        else if (selectedIndex == 1)
        {
            self.view.backgroundColor = [UIColor blueColor];
        }
        else if (selectedIndex == 2)
        {
            self.view.backgroundColor = [UIColor greenColor];
        }
        else
        {
            // Do Nothing
        }
    }
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
