//
//  MainViewController.m
//  singleView
//
//  Created by Lucy Hutcheson on 8/5/12.
//  Copyright (c) 2012 Pure Light Designs. All rights reserved.
//

#import "MainViewController.h"

@interface MainViewController ()

@end

@implementation MainViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (void)viewWillAppear:(BOOL)animated
{
    label1 = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 10.0f, 200.0f, 200.0f)];
    
    if (label1 != nil)
    {
        label1.backgroundColor = [UIColor blackColor];
        label1.text = @"this is my label teaslkdjf;asdj a;sldjf alsdkjf;a flaksdjoweruip uqpoweuropqiewurxt";
        label1.textAlignment = UITextAlignmentCenter;
        label1.numberOfLines = 6;
        label1.textColor = [UIColor blueColor];
    }
    [self.view addSubview:label1];
    
    label2 = [[UILabel alloc] initWithFrame:CGRectMake(10.0f, 40.0f, 200.0f, 20.0f)];
    
    //[self.view addSubview:label2];
    
    //self.view.backgroundColor = [UIColor grayColor];
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    label2.text = @"in ViewDidAppear";
    [super viewDidAppear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
}

@end
